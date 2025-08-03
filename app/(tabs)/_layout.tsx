import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Bookmark from "../../assets/icons/bookmark.svg";
import HomeIcon from "../../assets/icons/home.svg";
import Search from "../../assets/icons/search.svg";
import User from "../../assets/icons/user.svg";

const TabIcon = ({ Icon, focused, label }: any) => {
  return (
    <View
      className={`${
        focused
          ? "bg-gray-200 text-background-dark rounded-full px-12 py-4"
          : "p-4"
      } flex items-center justify-center w-full mt-4`}
    >
      <Icon
        className={focused ? "text-primary scale-110" : "text-gray-400"}
        width={24}
        height={24}
      />
      <Text
        className={`text-xs font-semibold ${
          focused ? "text-primary" : "text-gray-400"
        } leading-tight text-center w-[60px] truncate`}
      >
        {label}
      </Text>
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={HomeIcon} focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={Search} focused={focused} label="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="Saved"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={Bookmark} focused={focused} label="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={User} focused={focused} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
