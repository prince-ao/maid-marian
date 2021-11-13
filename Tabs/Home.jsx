import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [usMarkets, setUsMarkets] = useState([]);
  const [europeMarkets, setEuropeMarkets] = useState([]);
  const [asiaMarkets, setAsiaMarkets] = useState([]);
  const [currencyMarkets, setCurrencyMarkets] = useState([]);
  const [cryptoMarkets, setCryptoMarkets] = useState([]);
  const [ratesMarkets, setRatesMarkets] = useState([]);
  const [futuresMarkets, setFuturesMarkets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState("");
  const [time, setTime] = useState("");

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    try {
      fetch("http://74.68.72.242:4000/home/us-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setUsMarkets(json_);
        });
    } catch (e) {
      console.log("US markets down: ", e);
    }

    try {
      fetch("http://74.68.72.242:4000/home/europe-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setEuropeMarkets(json_);
        });
    } catch (e) {
      console.log("Europe markets down: ", e);
    }

    try {
      fetch("http://74.68.72.242:4000/home/asia-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setAsiaMarkets(json_);
        });
    } catch (e) {
      console.log("Asia markets down: ", e);
    }

    try {
      fetch("http://74.68.72.242:4000/home/currency-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setCurrencyMarkets(json_);
        });
    } catch (e) {
      console.log("Currency markets down: ", e);
    }

    try {
      fetch("http://74.68.72.242:4000/home/crypto-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setCryptoMarkets(json_);
        });
    } catch (e) {
      console.log("Crypto markets down: ", e);
    }

    try {
      fetch("http://74.68.72.242:4000/home/rates-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setRatesMarkets(json_);
        });
    } catch (e) {
      console.log("Rates markets down: ", e);
    }

    try {
      fetch("http://74.68.72.242:4000/home/futures-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setFuturesMarkets(json_);
        });
    } catch (e) {
      console.log("Futures markets: ", e);
    }
    setTimeout(() => {
      setTime(`${Math.random() * 1000000}`);
    }, 1000 * 30);
    return;
  }, [time]);
  // fetch("http://74.68.72.242:4000/home/us-markets")
  //   .then((res) => res.json())
  //   .then((json) => {
  //     const json_ = Object.entries(json);
  //     //console.log(json_);
  //     setUsMarkets(json_);
  //   });
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
        <View style={{ paddingTop: 10, paddingBottom: 10 }} />

        <View style={styles.cont}>
          <Text style={styles.rTitle}>US Markets 🇺🇸</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {usMarkets.map((usMarket, key) => {
              return (
                <View key={key} style={styles.c}>
                  <View style={styles.tName}>
                    <Text style={styles.t}>{usMarket[1][0]}</Text>
                    <Text style={styles.l}>{usMarket[1][1]}</Text>
                  </View>
                  <View style={styles.p}>
                    <Text style={styles.nums}>{usMarket[1][2]}</Text>
                    <Text
                      style={{
                        ...styles.middlex,
                        color:
                          usMarket[1][4][0] == "-"
                            ? "red"
                            : parseInt(usMarket[1][4]) > 0
                            ? "green"
                            : "black",
                        ...styles.nums,
                      }}
                    >
                      {usMarket[1][3]}
                    </Text>
                    <Text
                      style={{
                        ...styles.nums,
                        color:
                          usMarket[1][4][0] == "-"
                            ? "red"
                            : parseInt(usMarket[1][4]) > 0
                            ? "green"
                            : "black",
                      }}
                    >
                      {usMarket[1][4]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ paddingTop: 10, paddingBottom: 10 }} />

        <View style={styles.cont}>
          <Text style={styles.rTitle}>Europe Markets 🇪🇺</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {europeMarkets.map((europeMarket, key) => {
              return (
                <View key={key} style={styles.c}>
                  <View style={styles.tName}>
                    <Text style={styles.t}>{europeMarket[1][0]}</Text>
                    <Text style={styles.l}>{europeMarket[1][1]}</Text>
                  </View>
                  <View style={styles.p}>
                    <Text
                      style={{
                        ...styles.nums,
                        color: europeMarket[1][0][0] == "-" ? "red" : "green",
                      }}
                    >
                      {europeMarket[1][2]}
                    </Text>
                    <Text
                      style={{
                        ...styles.middlex,
                        /*color:
                          europeMarket[1][4][0] == "-"
                            ? "red"
                            : parseInt(europeMarket[1][4]) > 0
                            ? "green"
                            : "black",*/
                        ...styles.nums,
                      }}
                    >
                      {europeMarket[1][3]}
                    </Text>
                    <Text
                      style={{
                        ...styles.nums,
                        /*color:
                          europeMarket[1][4][0] == "-"
                            ? "red"
                            : parseInt(europeMarket[1][4]) > 0
                            ? "green"
                            : "black",*/
                      }}
                    >
                      {europeMarket[1][4]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ paddingTop: 10, paddingBottom: 10 }} />

        <View style={styles.cont}>
          <Text style={styles.rTitle}>Asia Markets 🌏</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {asiaMarkets.map((asiaMarket, key) => {
              return (
                <View key={key} style={styles.c}>
                  <View style={styles.tName}>
                    <Text style={styles.t}>{asiaMarket[1][0]}</Text>
                    <Text style={styles.l}>{asiaMarket[1][1]}</Text>
                  </View>
                  <View style={styles.p}>
                    <Text
                      style={{
                        ...styles.nums,
                        color: asiaMarket[1][0][0] == "-" ? "red" : "green",
                      }}
                    >
                      {asiaMarket[1][2]}
                    </Text>
                    <Text
                      style={{
                        ...styles.middlex,
                        //   color:
                        //     asiaMarket[1][4][0] == "-"
                        //       ? "red"
                        //       : parseInt(asiaMarket[1][4]) > 0
                        //       ? "green"
                        //       : "black",
                        ...styles.nums,
                      }}
                    >
                      {asiaMarket[1][3]}
                    </Text>
                    <Text
                      style={{
                        ...styles.nums,
                        //   color:
                        //     asiaMarket[1][4][0] == "-"
                        //       ? "red"
                        //       : parseInt(asiaMarket[1][4]) > 0
                        //       ? "green"
                        //       : "black",
                      }}
                    >
                      {asiaMarket[1][4]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ paddingTop: 10, paddingBottom: 10 }} />

        <View style={styles.cont}>
          <Text style={styles.rTitle}>Forex Markets 💱</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {currencyMarkets.map((currencyMarket, key) => {
              return (
                <View key={key} style={styles.c}>
                  <View style={styles.tName}>
                    <Text style={styles.t}>{currencyMarket[1][0]}</Text>
                    <Text style={styles.l}>{currencyMarket[1][1]}</Text>
                  </View>
                  <View style={styles.p}>
                    <Text
                      style={{
                        ...styles.middlex,
                        color: currencyMarket[1][3][0] == "-" ? "red" : "green",
                        ...styles.nums,
                      }}
                    >
                      {currencyMarket[1][2]}
                    </Text>
                    <Text
                    // style={{
                    //   ...styles.middlex,
                    //   color:
                    //     currencyMarket[1][4][0] == "-"
                    //       ? "red"
                    //       : parseInt(currencyMarket[1][4]) > 0
                    //       ? "green"
                    //       : "black",
                    //   ...styles.nums,
                    // }}
                    >
                      {currencyMarket[1][3]}
                    </Text>
                    <Text
                    // style={{
                    //   ...styles.nums,
                    //   color:
                    //     currencyMarket[1][4][0] == "-"
                    //       ? "red"
                    //       : parseInt(currencyMarket[1][4]) > 0
                    //       ? "green"
                    //       : "black",
                    // }}
                    >
                      {currencyMarket[1][4]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ paddingTop: 10, paddingBottom: 10 }} />

        <View style={styles.cont}>
          <Text style={styles.rTitle}>Crypto Markets 🔐</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {cryptoMarkets.map((cryptoMarket, key) => {
              return (
                <View key={key} style={styles.c}>
                  <View style={styles.tName}>
                    <Text style={styles.t}>{cryptoMarket[1][0]}</Text>
                    <Text style={styles.l}>{cryptoMarket[1][1]}</Text>
                  </View>
                  <View style={styles.p}>
                    <Text style={styles.nums}>{cryptoMarket[1][2]}</Text>
                    <Text
                      style={{
                        ...styles.middlex,
                        color:
                          cryptoMarket[1][4][0] == "-"
                            ? "red"
                            : parseInt(cryptoMarket[1][4]) > 0
                            ? "green"
                            : "black",
                        ...styles.nums,
                      }}
                    >
                      {cryptoMarket[1][3]}
                    </Text>
                    <Text
                      style={{
                        ...styles.nums,
                        color:
                          cryptoMarket[1][4][0] == "-"
                            ? "red"
                            : parseInt(cryptoMarket[1][4]) > 0
                            ? "green"
                            : "black",
                      }}
                    >
                      {cryptoMarket[1][4]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ paddingTop: 10, paddingBottom: 10 }} />

        <View style={styles.cont}>
          <Text style={styles.rTitle}>Rates Markets 📈</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {ratesMarkets.map((ratesMarket, key) => {
              return (
                <View key={key} style={styles.c}>
                  <View style={styles.tName}>
                    <Text style={styles.t}>{ratesMarket[1][0]}</Text>
                    <Text style={styles.l}>{ratesMarket[1][1]}</Text>
                  </View>
                  <View style={styles.p}>
                    <Text
                      style={{
                        ...styles.middlex,
                        color:
                          ratesMarket[1][2][0] == "-"
                            ? "red"
                            : parseInt(ratesMarket[1][4]) > 0
                            ? "green"
                            : "black",
                        ...styles.nums,
                      }}
                    >
                      {ratesMarket[1][2]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ paddingTop: 10, paddingBottom: 10 }} />

        <View style={styles.cont}>
          <Text style={styles.rTitle}>Futures Markets 🔮</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {futuresMarkets.map((futuresMarket, key) => {
              return (
                <View key={key} style={styles.c}>
                  <View style={styles.tName}>
                    <Text style={styles.t}>{futuresMarket[1][0]}</Text>
                    <Text style={styles.l}>{futuresMarket[1][1]}</Text>
                  </View>
                  <View style={styles.p}>
                    <Text style={styles.nums}>{futuresMarket[1][2]}</Text>
                    <Text
                      style={{
                        ...styles.middlex,
                        color:
                          futuresMarket[1][4][0] == "-"
                            ? "red"
                            : parseInt(futuresMarket[1][4]) > 0
                            ? "green"
                            : "black",
                        ...styles.nums,
                      }}
                    >
                      {futuresMarket[1][3]}
                    </Text>
                    <Text
                      style={{
                        ...styles.nums,
                        color:
                          futuresMarket[1][4][0] == "-"
                            ? "red"
                            : parseInt(futuresMarket[1][4]) > 0
                            ? "green"
                            : "black",
                      }}
                    >
                      {futuresMarket[1][4]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e773eb",
  },
  cont: {
    backgroundColor: "#ffd2fb",
    paddingBottom: 30,
  },
  rTitle: {
    fontSize: 32,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 30,
  },
  tName: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginRight: 30,
  },
  c: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    height: 200,
    alignItems: "center",
    marginLeft: 30,
    borderRightWidth: 5,
    borderRightColor: "#00ffff",
  },
  l: {
    width: 150,
    marginTop: 10,
  },
  t: {
    fontSize: 22,
    fontWeight: "bold",
    width: 170,
  },
  p: {
    marginTop: 10,
  },
  middlex: {
    marginTop: 10,
    marginBottom: 10,
  },
  nums: {
    fontSize: 16,
  },
});
