import React, { useState, useEffect, useReducer } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	ActivityIndicator,
	TextInput,
} from "react-native";
import { FAB, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ChartDot,
	ChartPath,
	ChartPathProvider,
	monotoneCubicInterpolation,
	bSplineInterpolation,
} from "@rainbow-me/animated-charts";
import { useChartData } from "@rainbow-me/animated-charts";

import test from "./test.json";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
} from "react-native-reanimated";
import * as SQLite from "expo-sqlite";

const stocks = require("alphavantage")({ key: "QWU0U9D3208CKEP3" });

const StockView = ({ navigation, route }) => {
	const symbol = route.params.symbol;
	const name = route.params.name;
	const overView = route.params.overView;
	const change = route.params.change;

	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	const [data, setData] = useState([]);
	const [isSaved, setIsSaved] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const latestStats =
		test["Time Series (Daily)"][Object.keys(test["Time Series (Daily)"])[0]];

	const { width: SIZE } = Dimensions.get("window");

	const ChartYValues = ChartLabelFactory("originalY");

	const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

	useEffect(() => {
		const raw_data = test["Time Series (Daily)"];
		const data = Object.keys(raw_data)
			.reverse()
			.map((timestamp) => {
				let time = Date.parse(timestamp);
				return {
					x: time,
					y: parseFloat(raw_data[timestamp]["4. close"]).toFixed(2),
				};
			});
		setData(data);
	}, []);
	const db = SQLite.openDatabase("stockslist.db");

	function add() {
		db.transaction((tx) =>
			tx.executeSql("INSERT INTO stocks (symbol, name) VALUES (?, ?)", [
				symbol,
				name,
			])
		);
	}
	function remove() {
		db.transaction((tx) => {
			tx.executeSql("DELETE FROM stocks WHERE symbol = ?", [symbol]);
		});
	}
	function createTabel() {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS stocks(symbol PRIMARY KEY NOT NULL, name TEXT)"
			);
		});
	}
	function isAdded() {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT symbol FROM stocks WHERE symbol = ?",
				[symbol],
				(context, { rows }) =>
					rows["_array"].length == 0 ? setIsSaved(false) : setIsSaved(true)
			);
		});
	}

	useEffect(() => {
		createTabel();
		isAdded();
	});

	function ChartLabelFactory(style) {
		return function ChartLabel({ format, ...props }) {
			const { [style]: val = 0 } = useChartData();
			const formattedValue = useDerivedValue(() => {
				return format ? format(val.value) : val.value;
			}, []);
			const textProps = useAnimatedStyle(() => {
				return {
					text:
						typeof formattedValue.value !== "undefined"
							? formattedValue.value.toString().length > 0
								? "$" + parseFloat(formattedValue.value).toFixed(2)
								: "$" + latestStats["2. high"]
							: "Not Avaliable",
				};
			}, []);
			return (
				<Animated.View
					style={{
						transform: [{ translateY: -60 }],
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						backgroundColor: "transparent",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						height: 60,
						elevation: 4,
						zIndex: 100,
					}}>
					<AnimatedTextInput
						{...props}
						animatedProps={textProps}
						defaultValue={format ? format(val.value) : val.value}
						editable={false}
						style={{
							color: "black",
							fontWeight: "bold",
							marginLeft: 80,
							fontSize: 20,
						}}
					/>
				</Animated.View>
			);
		};
	}

	// async function getAllDaily() {
	// 	try {
	// 		setIsLoading(true);
	// 		const req = await fetch(
	// 			`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=QWU0U9D3208CKEP3`
	// 		);
	// 		const res = await req.json();

	// 		setIsLoading(false);
	// 		console.log(res);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	const points = bSplineInterpolation({
		data: data,
		degree: 3,
		range: 80,
	});

	function currencyFormat(num) {
		return "$" + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function trimNum(number) {
		if (typeof number !== "undefined") {
			switch (number.toString().length) {
				case 4:
					return number.toString()[0] + "K";
				case 5:
					return number.toString().slice(0, 2) + "K";
				case 6:
					return number.toString().slice(0, 3) + "K";
				case 7:
					return number.toString()[0] + "M";
				case 8:
					return number.toString().slice(0, 2) + "M";
				case 9:
					return number.toString().slice(0, 3) + "M";
				case 10:
					return number.toString()[0] + "B";
				case 11:
					return number.toString().slice(0, 2) + "B";
				case 12:
					return number.toString().slice(0, 3) + "B";
				case 13:
					return number.toString()[0] + "T";
				default:
					return "None";
			}
		} else {
			return "None";
		}
	}
	return (
		<SafeAreaView
			style={{
				flexDirection: "column",
				backgroundColor: "white",
			}}>
			<ScrollView>
				<View
					style={{
						flexDirection: "row",
					}}>
					<View
						style={{
							flexDirection: "row",
							width: Dimensions.get("window").width / 1.2,
						}}>
						<Icon
							raised
							onPress={() => navigation.goBack()}
							name="arrow-back"
							size={20}
							color="pink"
							type="ionicon"
							containerStyle={{ left: 10, top: 10 }}
						/>
						<Text style={{ left: 20, top: 27, fontSize: 20 }}>{symbol}</Text>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={{
								left: 20,
								top: 34,
								fontSize: 13,
							}}>
							{" "}
							{name}
						</Text>
					</View>
					<View>
						<Icon
							raised
							onPress={() => {
								try {
									if (!isSaved) {
										add();
										setIsSaved(true);
									} else {
										remove();
										setIsSaved(false);
									}
								} catch (err) {
									console.log(err);
								}
							}}
							name={!isSaved ? "add" : "close"}
							size={20}
							color="pink"
							type="ionicon"
							iconStyle={{ fontWeight: "bold" }}
							containerStyle={{ top: 10 }}
							style={{ position: "relative" }}
						/>
					</View>
				</View>
				<View style={{ backgroundColor: "white", marginTop: 50 }}>
					{data.length < 1 ? (
						<ActivityIndicator size="large" color="pink" style={styles.center} />
					) : (
						<ChartPathProvider data={{ points, smoothingStrategy: "complex" }}>
							<ChartYValues />
							<ChartPath
								smoothingWhileTransitioningEnabled={true}
								hitSlop={0}
								height={SIZE / 2}
								stroke={
									typeof change["Global Quote"] !== "undefined"
										? parseFloat(change["Global Quote"]["10. change percent"]) < 0
											? "red"
											: "green"
										: "black"
								}
								height={250}
								width={SIZE}
								fill="none"
							/>
							<ChartDot
								size={10}
								style={{
									backgroundColor: "pink",
									width: 10,
									height: 10,
									borderRadius: 10,
									justifyContent: "center",
									alignItems: "center",
								}}
							/>
						</ChartPathProvider>
					)}
				</View>
				<View style={{ backgroundColor: "white", marginTop: 20 }}>
					<Text style={{ fontSize: 20, fontWeight: "bold", marginStart: 10 }}>
						Trading Information
					</Text>
				</View>
				<View
					style={{ flexDirection: "column", marginTop: 25, alignSelf: "center" }}>
					<View style={styles.row}>
						<View style={styles.innerColumn}>
							<Text style={styles.statsName}>Open</Text>
							<Text numberOfLines={1} ellipsizeMode="tail" style={styles.statsValue}>
								{typeof change["Global Quote"] !== "undefined"
									? currencyFormat(parseFloat(change["Global Quote"]["02. open"]))
									: "None"}
							</Text>
						</View>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.statsName}>Volume</Text>
							<Text numberOfLines={1} ellipsizeMode="tail" style={styles.statsValue}>
								{typeof change["Global Quote"] !== "undefined"
									? trimNum(parseFloat(change["Global Quote"]["06. volume"]))
									: "None"}
							</Text>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.innerColumn}>
							<Text style={styles.statsName}>Today's High</Text>
							<Text numberOfLines={1} ellipsizeMode="tail" style={styles.statsValue}>
								{typeof change["Global Quote"] !== "undefined"
									? currencyFormat(parseFloat(change["Global Quote"]["03. high"]))
									: "None"}
							</Text>
						</View>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.statsName}>Change %</Text>
							<Text numberOfLines={1} ellipsizeMode="tail" style={styles.statsValue}>
								{typeof change["Global Quote"] !== "undefined"
									? parseFloat(change["Global Quote"]["10. change percent"]).toFixed(2)
									: "None"}
							</Text>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.innerColumn}>
							<Text style={styles.statsName}>Today's Low</Text>
							<Text style={styles.statsValue}>${latestStats["3. low"]}</Text>
						</View>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.statsName}>Market Cap</Text>
							<Text numberOfLines={1} ellipsizeMode="tail" style={styles.statsValue}>
								{typeof overView["MarketCapitalization"] !== "undefined"
									? trimNum(overView["MarketCapitalization"])
									: "None"}
							</Text>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.innerColumn}>
							<Text style={styles.statsName}>52 Wk High</Text>
							<Text style={styles.statsValue}>${latestStats["2. high"]}</Text>
						</View>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.statsName}>P/E Ratio</Text>
							<Text numberOfLines={1} ellipsizeMode="tail" style={styles.statsValue}>
								{typeof overView["PERatio"] !== "undefined"
									? parseFloat(overView["PERatio"]).toFixed(2)
									: "None"}
							</Text>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.innerColumn}>
							<Text style={styles.statsName}>52 Wk Low</Text>
							<Text style={styles.statsValue}>
								{typeof overView["52WeekHigh"] !== "undefined"
									? currencyFormat(parseFloat(overView["52WeekHigh"]))
									: "None"}
							</Text>
						</View>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.statsName}>Div/Yield</Text>
							<Text numberOfLines={1} ellipsizeMode="tail" style={styles.statsValue}>
								{typeof overView["DividendYield"] !== "undefined"
									? parseFloat(overView["DividendYield"]).toFixed(2)
									: "None"}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<ActivityIndicator
				animating={isLoading}
				size="large"
				color="#00ff00"
				style={{ left: 0, top: 0, bottom: 0, right: 0 }}
			/>
		</SafeAreaView>
	);
};

export default StockView;

const styles = StyleSheet.create({
	statsName: {
		fontSize: 12,
		fontWeight: "800",
		color: "#101010",
		flexWrap: "wrap",
		flex: 1,
	},
	statsValue: {
		fontWeight: "bold",
		color: "black",
		flexWrap: "wrap",
	},
	row: {
		marginStart: 10,
		flexDirection: "row",
		marginBottom: 20,
		flexWrap: "wrap",
	},
	innerColumn: {
		flexDirection: "column",
		width: 200,
	},
	center: { left: 0, top: 0, bottom: 0, right: 0 },
});
