
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [usMarkets, setUsMarkets] = useState([]);
  const [europeMarkets, setEuropeMarkets] = useState([]);
  const [asiaMarkets, setAsiaMarkets] = useState([]);
  const [currencyMarkets, setCurrencyMarkets] = useState([]);
  const [cryptoMarkets, setCryptoMarkets] = useState([]);
  const [ratesMarkets, setRatesMarkets] = useState([]);
  const [futuresMarkets, setFuturesMarkets] = useState([]);
  const [time, setTime] = useState("");
  useEffect(() => {
    setTimeout(() => {
      fetch("http://74.68.72.242:4000/home/us-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setUsMarkets(json_);
        });

      fetch("http://74.68.72.242:4000/home/europe-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setEuropeMarkets(json_);
        });

      fetch("http://74.68.72.242:4000/home/asia-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setAsiaMarkets(json_);
        });

      fetch("http://74.68.72.242:4000/home/currency-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setCurrencyMarkets(json_);
        });

      fetch("http://74.68.72.242:4000/home/crypto-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setCryptoMarkets(json_);
        });

      fetch("http://74.68.72.242:4000/home/rates-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setRatesMarkets(json_);
        });

      fetch("http://74.68.72.242:4000/home/futures-markets")
        .then((res) => res.json())
        .then((json) => {
          const json_ = Object.entries(json);
          //console.log(json_);
          setFuturesMarkets(json_);
        });

      setTime(`${Math.random() * 1000000}`);
    }, 1000 * 40);
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
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>US Markets</Text>
          <ScrollView horizontal={true}>
            {usMarkets.map((usMarket, key) => {
              return (
                <View key={key}>
                  <Text>{usMarket[1][0]}</Text>
                  <Text>{usMarket[1][1]}</Text>
                  <Text>{usMarket[1][2]}</Text>
                  <Text>{usMarket[1][3]}</Text>
                  <Text>{usMarket[1][4]}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View>
          <Text>Europe Markets</Text>
          <ScrollView horizontal={true}>
            {europeMarkets.map((europeMarket, key) => {
              return (
                <View key={key}>
                  <Text>{europeMarket[1][0]}</Text>
                  <Text>{europeMarket[1][1]}</Text>
                  <Text>{europeMarket[1][2]}</Text>
                  <Text>{europeMarket[1][3]}</Text>
                  <Text>{europeMarket[1][4]}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View>
          <Text>Asia Markets</Text>
          <ScrollView horizontal={true}>
            {asiaMarkets.map((asiaMarket, key) => {
              return (
                <View key={key}>
                  <Text>{asiaMarket[1][0]}</Text>
                  <Text>{asiaMarket[1][1]}</Text>
                  <Text>{asiaMarket[1][2]}</Text>
                  <Text>{asiaMarket[1][3]}</Text>
                  <Text>{asiaMarket[1][4]}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View>
          <Text>Forex Markets</Text>
          <ScrollView horizontal={true}>
            {currencyMarkets.map((currencyMarket, key) => {
              return (
                <View key={key}>
                  <Text>{currencyMarket[1][0]}</Text>
                  <Text>{currencyMarket[1][1]}</Text>
                  <Text>{currencyMarket[1][2]}</Text>
                  <Text>{currencyMarket[1][3]}</Text>
                  <Text>{currencyMarket[1][4]}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View>
          <Text>Crypto Markets</Text>
          <ScrollView horizontal={true}>
            {cryptoMarkets.map((cryptoMarket, key) => {
              return (
                <View key={key}>
                  <Text>{cryptoMarket[1][0]}</Text>
                  <Text>{cryptoMarket[1][1]}</Text>
                  <Text>{cryptoMarket[1][2]}</Text>
                  <Text>{cryptoMarket[1][3]}</Text>
                  <Text>{cryptoMarket[1][4]}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View>
          <Text>Rates Markets</Text>
          <ScrollView horizontal={true}>
            {ratesMarkets.map((ratesMarket, key) => {
              return (
                <View key={key}>
                  <Text>{ratesMarket[1][0]}</Text>
                  <Text>{ratesMarket[1][1]}</Text>
                  <Text>{ratesMarket[1][2]}</Text>
                  <Text>{ratesMarket[1][3]}</Text>
                  <Text>{ratesMarket[1][4]}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View>
          <Text>Futures Markets</Text>
          <ScrollView horizontal={true}>
            {futuresMarkets.map((futuresMarket, key) => {
              return (
                <View key={key}>
                  <Text>{futuresMarket[1][0]}</Text>
                  <Text>{futuresMarket[1][1]}</Text>
                  <Text>{futuresMarket[1][2]}</Text>
                  <Text>{futuresMarket[1][3]}</Text>
                  <Text>{futuresMarket[1][4]}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View>
          <Text>Futures Markets</Text>
          <ScrollView horizontal={true}>
            {futuresMarkets.map((futuresMarket, key) => {
              return (
                <View key={key}>
                  <Text>{futuresMarket[1][0]}</Text>
                  <Text>{futuresMarket[1][1]}</Text>
                  <Text>{futuresMarket[1][2]}</Text>
                  <Text>{futuresMarket[1][3]}</Text>
                  <Text>{futuresMarket[1][4]}</Text>
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

const styles = StyleSheet.create({});
