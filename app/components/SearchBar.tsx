import { SearchIcon } from "@/assets/icons";
import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  placeHolder?: string;
  onPress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({
  onPress,
  placeHolder = "Search",
  value,
  onChangeText,
}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <SearchIcon
        height={24}
        width={24}
        color={"#ab8bff"}
        className="object-contain"
      />
      <TextInput
        onFocus={onPress}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#ab8bff"
        className="text-white flex-1 text-lg"
      />
    </View>
  );
};

export default SearchBar;
