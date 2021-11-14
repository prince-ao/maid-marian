import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const StockList = ({ navigation }) => {
	const [data, setData] = useState([]);

	const db = SQLite.openDatabase("stockslist.db");

	const [isLoading, setIsLoading] = useState(false);

	const localStocks = () => {
		db.transaction((tx) => {
			tx.executeSql("SELECT * FROM stocks", [], (tx, res) => {
				setData(res.rows._array);
			});
		});
	};

	function remove(symbol) {
		db.transaction((tx) => {
			tx.executeSql("DELETE FROM stocks WHERE symbol = ?", [symbol]);
		});
	}
	useEffect(() => {
		localStocks();
	});

	async function getStatics(symbol) {
		try {
			setIsLoading(true);
			const req = await fetch(
				`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=QWU0U9D3208CKEP3`
			);
			const res = await req.json();
			setIsLoading(false);

			return res;
		} catch (err) {
			console.log(err);
		}
	}

	async function getGlobal(symbol) {
		setIsLoading(true);
		const req = await fetch(
			`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=QWU0U9D3208CKEP3`
		);
		const res = await req.json();
		setIsLoading(false);

		return res;
	}
	<View style={styles.center}>
		<Text>Your List is empty.</Text>
	</View>;

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
				<Text style={{ left: 20, top: 27, fontSize: 20 }}>Stock List</Text>
			</View>
			{data.length < 1 ? (
				<View style={styles.center}>
					<Text style={{ fontSize: 20 }}>Your List is empty.</Text>
				</View>
			) : (
				<ScrollView
					overScrollMode="never"
					contentContainerStyle={{
						flexGrow: 1,
					}}
					style={{ marginTop: 20 }}>
					{data.map((val, i) => {
						return (
							<ListItem
								style={{ borderColor: "pink" }}
								key={i}
								bottomDivider
								onPress={async () => {
									const data = await getStatics(val.symbol);
									const global = await getGlobal(val.symbol);
									navigation.navigate("StockView", {
										symbol: val.symbol,
										name: val.name,
										overView: data,
										change: global,
									});
								}}>
								<ListItem.Content>
									<ListItem.Title numberOfLines={1} ellipsizeMode={"tail"}>
										{val.name}
									</ListItem.Title>
									<ListItem.Subtitle>{val.symbol}</ListItem.Subtitle>
								</ListItem.Content>
								<Ionicons name={"stats-chart"} size={20} color={"black"} />
								<Ionicons
									name={"close"}
									size={20}
									color={"black"}
									onPress={() => remove(val.symbol)}
								/>
							</ListItem>
						);
					})}
				</ScrollView>
			)}

			<ActivityIndicator
				animating={isLoading}
				size="large"
				color="pink"
				style={{ flex: 1, justifyContent: "center" }}
			/>
		</SafeAreaView>
	);
};

export default StockList;

const styles = StyleSheet.create({
	center: {
		left: Dimensions.get("window").width / 3.5,
		top: Dimensions.get("window").height / 2.5,
	},
});
