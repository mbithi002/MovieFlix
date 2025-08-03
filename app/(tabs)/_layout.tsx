import {
  BookmarkIcon,
  HomeIcon,
  ProfileIcon,
  SearchIcon,
} from "@/assets/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TabIcon = ({ Icon, focused, label }: any) => {
  return (
    <View className={`flex items-center justify-center w-full gap-1`}>
      <Icon width={24} height={24} color={focused ? "#AB8BFF" : "#9CA4AB"} />
      <Text
        className={`text-xs font-semibold ${
          focused ? "text-light-100" : "text-light-300"
        } truncate text-center w-[60px]`}
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
          backgroundColor: "#000000",
          borderRadius: 32,
          marginHorizontal: 24,
          marginBottom: 24,
          height: 64,
          position: "absolute",
          borderTopWidth: 0,
          elevation: 4,
          alignItems: "center",
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          paddingTop: 8,
          alignSelf: "center",
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
            <TabIcon Icon={SearchIcon} focused={focused} label="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="Saved"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={BookmarkIcon} focused={focused} label="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={ProfileIcon} focused={focused} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
