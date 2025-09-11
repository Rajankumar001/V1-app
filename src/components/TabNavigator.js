import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from "../screens/HomeScreen";
import PlanTripScreen from "../screens/PlanTripScreen";
import HotelsScreen from "../screens/HotelsScreen";
import DonationScreen from "../screens/DonationScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color, size }) => (
  <MaterialIcons name={name} size={size} color={color} />
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6B35",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#FF6B35",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
          title: "BhaktiBhraman",
        }}
      />
      <Tab.Screen
        name="Plan"
        component={PlanTripScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="flight" color={color} size={size} />
          ),
          title: "Plan Your Trip",
        }}
      />
      <Tab.Screen
        name="Hotels"
        component={HotelsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="hotel" color={color} size={size} />
          ),
          title: "Hotels Near Temple",
        }}
      />
      <Tab.Screen
        name="Donate"
        component={DonationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: "relative" }}>
              <TabIcon name="volunteer-activism" color={color} size={size} />
              {color === "#FF6B35" && (
                <View
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    backgroundColor: "#FF6B35",
                    borderRadius: 8,
                    width: 16,
                    height: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}
                  >
                    6
                  </Text>
                </View>
              )}
            </View>
          ),
          title: "Temple Donation",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="person" color={color} size={size} />
          ),
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}
