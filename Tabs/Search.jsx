import React, { useState, useEffect } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";
import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	Dimensions,
	ScrollView,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Modal,
	StatusBar,
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-elements/dist/buttons/FAB";

const Search = ({ navigation }) => {
	const [query, setQuery] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	const onChangeQuery = (query) => {
		setQuery(query);
		query.length == 0 ? null : getQueryRes(query);
	};

	async function getQueryRes(searchQuery) {
		try {
			setIsLoading(true);
			const req = await fetch(
				`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=QWU0U9D3208CKEP3`
			);
			const res = await req.json();

			res.bestMatches ? setSearchResult(res.bestMatches) : console.log(res);

			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	}

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

	if (!searchResult) {
		return null;
	}
	return (
		<>
			<SafeAreaView>
				<StatusBar />
				<SearchBar
					round
					searchIcon={{ size: 24 }}
					placeholder="Search..."
					onChangeText={onChangeQuery}
					value={query}
					containerStyle={{
						backgroundColor: "white",
						borderBottomWidth: 1,
						borderRadius: 10,
					}}
				/>
				<ScrollView
					overScrollMode="never"
					contentContainerStyle={{
						flexGrow: 1,
					}}>
					{searchResult.map((val, i) => {
						return (
							<ListItem
								key={i}
								bottomDivider
								onPress={async () => {
									const data = await getStatics(val["1. symbol"]);
									const global = await getGlobal(val["1. symbol"]);
									navigation.navigate("StockView", {
										symbol: val["1. symbol"],
										name: val["2. name"],
										overView: data,
										change: global,
									});
								}}>
								<ListItem.Content>
									<ListItem.Title numberOfLines={1} ellipsizeMode={"tail"}>
										{val["2. name"]}
									</ListItem.Title>
									<ListItem.Subtitle>{val["1. symbol"]}</ListItem.Subtitle>
								</ListItem.Content>
								<Text style={{ fontWeight: "bold" }}>{val["3. type"]}</Text>
								<Ionicons name={"stats-chart"} size={20} color={"black"} />
							</ListItem>
						);
					})}
				</ScrollView>
			</SafeAreaView>
			{/* <ActivityIndicator
				size="small"
				color="#0000ff"
				style={{ flex: 1, justifyContent: "center" }}
			/> */}
		</>
	);
};

export default Search;

const styles = () =>
	StyleSheet.create({
		searchBar: {},
	});
