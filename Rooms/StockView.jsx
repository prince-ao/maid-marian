import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import { FAB, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ChartDot,
	ChartPath,
	ChartPathProvider,
	monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";

import test from "./test.json";

const StockView = ({ navigation, route }) => {
	// 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=TSCO.LON&outputsize=full&apikey=demo'
	const symbol = route.params.symbol;

	// const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const { width: SIZE } = Dimensions.get("window");

	async function getAllDaily() {
		try {
			setIsLoading(true);
			const req = await fetch(
				`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=QWU0U9D3208CKEP3`
			);
			const res = await req.json();

			setIsLoading(false);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}
	// Object.keys(test["Time Series (Daily)"]).map((val, i) =>
	// 	data.push({
	// 		y: test["Time Series (Daily)"][val]["4. close"],
	// 		x: new Date(val).getTime(),
	// 	})
	// );
	const data = [
		{ x: 1453075200, y: 1.47 },
		{ x: 1453161600, y: 1.37 },
		{ x: 1453248000, y: 1.53 },
		{ x: 1453334400, y: 1.54 },
		{ x: 1453420800, y: 1.52 },
		{ x: 1453507200, y: 2.03 },
		{ x: 1453593600, y: 2.1 },
		{ x: 1453680000, y: 2.5 },
		{ x: 1453766400, y: 2.3 },
		{ x: 1453852800, y: 2.42 },
		{ x: 1453939200, y: 2.55 },
		{ x: 1454025600, y: 2.41 },
		{ x: 1454112000, y: 2.43 },
		{ x: 1454198400, y: 2.2 },
	];

	const points = monotoneCubicInterpolation({ data, range: 40 });
	return (
		<SafeAreaView>
			<View style={{ flexDirection: "row" }}>
				<Icon
					raised
					onPress={() => navigation.goBack()}
					name="arrow-back"
					size={20}
					color="pink"
					type="ionicon"
					containerStyle={{ left: 10, top: 10 }}
				/>
				<Text style={{ left: 20, top: 27, fontSize: 20 }}>
					{route.params.symbol}
				</Text>
			</View>
			<View style={{ flexDirection: "column", left: 20, top: 27, fontSize: 20 }}>
				<Text>Hello</Text>
			</View>
			<View style={{ backgroundColor: "white" }}>
				<ChartPathProvider data={{ points, smoothingStrategy: "bezier" }}>
					<ChartPath height={SIZE / 2} stroke="yellow" width={SIZE} />
					<ChartDot style={{ backgroundColor: "blue" }} />
				</ChartPathProvider>
			</View>
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

const styles = StyleSheet.create({});
