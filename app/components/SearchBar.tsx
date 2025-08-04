import { SearchIcon } from "@/assets/icons";
import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  placeHolder: string;
  onPress?: () => void;
}

const SearchBar = ({ onPress, placeHolder = "Search" }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <SearchIcon
        height={24}
        width={24}
        color={"#ab8bff"}
        className="object-contain"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeHolder}
        value=""
        onChange={() => {}}
        placeholderTextColor="#ab8bff"
        placeholderClassName="text-white"
        className="text-white flex-1 mt-2 text-lg"
      />
    </View>
  );
};

export default SearchBar;
