import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const Globe = () => {
  const [p1, setP1] = useState([1.56, 1.46, 1.51, 1.45, 1.53]);
  const [d1, setD1] = useState([
    "2021/11/10",
    "2021/11/09",
    "2021/11/08",
    "2021/11/05",
    "2021/11/04",
  ]);
  const [p2, setP2] = useState([
    6.3, 1.23358439630637, 1.81221007526015, 2.44258329692818, 2.13011000365963,
    1.26158320570537,
  ]);
  const [d2, setD2] = useState([
    "Now",
    "2020/01/01",
    "2019/01/01",
    "2018/01/01",
    "2017/01/01",
    "2016/01/01",
  ]);
  const [p3, setP3] = useState([4.6, 4.8, 5.2, 5.4, 5.9]);
  const [d3, setD3] = useState([
    "2021/10/01",
    "2021/09/01",
    "2021/08/01",
    "2021/07/01",
    "2021/06/01",
  ]);
  const [refresh, setRefresh] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [time, setTime] = useState("");
  // useEffect(() => {
  //   setTimeout(() => {
  //     fetch(
  //       `https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=daily&maturity=10year&apikey=YVSB9G395OUHBATK`
  //     )
  //       .then((response) => response.json())
  //       .then((res_) => {
  //         const json_ = Object.values(res_);
  //         const raw_json_ = json_[3];
  //         console.log;
  //         let raw_json_cut;
  //         try {
  //           raw_json_cut = raw_json_.slice(0, 5);
  //           const prices = raw_json_cut.map((value) =>
  //             parseFloat(value["value"])
  //           );
  //           const dates = raw_json_cut.map((value) => value["date"]);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       });

  //     fetch(
  //       `https://www.alphavantage.co/query?function=INFLATION&datatype=json&apikey=YVSB9G395OUHBATK`
  //     )
  //       .then((response) => response.json())
  //       .then((res_) => {
  //         console.log(res_);
  //         const json_ = Object.values(res_);
  //         const raw_json_ = json_[3];
  //         let raw_json_cut;
  //         try {
  //           raw_json_cut = raw_json_.slice(0, 5);
  //           const prices = raw_json_cut.map((value) =>
  //             parseFloat(value["value"])
  //           );
  //           const dates = raw_json_cut.map((value) => value["date"]);
  //           console.log(prices);
  //           console.log(dates);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       });

  //     fetch(
  //       `https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=YVSB9G395OUHBATK`
  //     )
  //       .then((response) => response.json())
  //       .then((res_) => {
  //         const json_ = Object.values(res_);
  //         const raw_json_ = json_[3];
  //         let raw_json_cut;
  //         try {
  //           raw_json_cut = raw_json_.slice(0, 5);
  //           const prices = raw_json_cut.map((value) =>
  //             parseFloat(value["value"])
  //           );
  //           const dates = raw_json_cut.map((value) => value["date"]);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       });
  //     setTime(`${Math.random() * 1000000}`);
  //   }, 1000 * 20);
  //   /*const raw_data = data_["Time Series (Daily)"];
  //     const data = Object.keys(raw_data)
  //       .reverse()
  //       .map((timestamp) => {
  //         let time = Date.parse(timestamp);
  //         return { x: time, y: parseFloat(raw_data[timestamp]["4. close"]) };
  //       });
  //     setDat(data);*/
  // }, [time]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              wait(2000).then(() => {
                setRefresh(`${Math.random() * 1000000}`);
                setRefreshing(false);
              });
            }}
            tintColor="black"
          />
        }
      >
        <View>
          <Text style={styles.text}>US Treasury Yield 🏢</Text>
          <LineChart
            data={{
              labels: d1.reverse(),
              datasets: [
                {
                  data: p1.reverse(),
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#e200c4",
              backgroundGradientFrom: "#fb00d1b3",
              backgroundGradientTo: "#ffbefc",
              decimalPlaces: 2,
              color: (opacity = 1) => `#000`,
              labelColor: (opacity = 1) => `#000`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        <View>
          <Text style={styles.text}>
            Inflation - US Dollar Consumer Price 💵🔻
          </Text>
          <LineChart
            data={{
              labels: d2.reverse(),
              datasets: [
                {
                  data: p2.reverse(),
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#e200c4",
              backgroundGradientFrom: "#00772e",
              backgroundGradientTo: "#abf3cf",
              decimalPlaces: 2,
              color: (opacity = 1) => `#000`,
              labelColor: (opacity = 1) => `#000`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        <View>
          <Text style={styles.text}>Unemployment Rate 💼</Text>
          <LineChart
            data={{
              labels: d3.reverse(),
              datasets: [
                {
                  data: p3.reverse(),
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#e200c4",
              backgroundGradientFrom: "#00fbd9",
              backgroundGradientTo: "#d7faf8",
              decimalPlaces: 2,
              color: (opacity = 1) => `#000`,
              labelColor: (opacity = 1) => `#000`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#f826ff",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Globe;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffd2fb",
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 40,
  },
});
