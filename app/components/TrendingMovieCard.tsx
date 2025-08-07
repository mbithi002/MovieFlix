import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type TrendingMovieCardProps = {
  poster_url: string;
  title: string;
  onPress?: () => void;
  index: number;
};

const TrendingMovieCard: React.FC<TrendingMovieCardProps> = ({
  poster_url,
  title,
  onPress,
  index,
}) => {
  return (
    <TouchableOpacity
      className="mr-4 rounded-lg overflow-hidden w-36"
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Poster with index number overlay */}
      <View className="relative w-full h-56 rounded-lg overflow-hidden">
        <Image
          source={{ uri: poster_url }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Index number */}
        <Text className="absolute bottom-2 left-2 text-white font-bold text-5xl drop-shadow-md">
          {index + 1}
        </Text>
      </View>

      {/* Title */}
      <Text className="text-white text-xs font-semibold mt-2" numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TrendingMovieCard;
