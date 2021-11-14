import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Globe, Search } from "./Tabs";
import { StockView } from "./Rooms";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "globe") {
            iconName = focused ? "globe" : "globe-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#14a514",
        tabBarInactiveTintColor: "#e451f1",
        tabBarStyle: {
          backgroundColor: "#995516",
          borderTopWidth: 0,
          height: 60,
          borderRadius: 5,
        },
      })}
    >
      <Tab.Screen name="home">{(props) => <Home {...props} />}</Tab.Screen>
      <Tab.Screen name="search">{(props) => <Search {...props} />}</Tab.Screen>
      <Tab.Screen name="globe">{(props) => <Globe {...props} />}</Tab.Screen>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ tabBarShowLabel: false, headerShown: false }}
      >
        <Stack.Screen name="BottomTab">
          {(props) => <BottomTab {...props} />}
        </Stack.Screen>
        <Stack.Screen name="StockView">
          {(props) => <StockView {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
