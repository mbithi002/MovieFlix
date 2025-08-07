import { BookmarkIcon } from "@/assets/icons";
import React from "react";
import { Text, View } from "react-native";

const Saved = () => {
  return (
    <View className="flex-1 items-center justify-center bg-primary px-4">
      <BookmarkIcon width={80} height={80} color="#ccc" />
      <Text className="text-white text-xl font-semibold mt-4">Saved</Text>
      <Text className="text-light-100 text-center mt-2">
        This page has not been implemented yet.{"\n"}Please check back later.
      </Text>
    </View>
  );
};

export default Saved;
