import BackIcon from "@/assets/icons/BackIcon";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchMovieDetails } from "../services/api";
import useFetch from "../services/useFetch";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Movie = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(String(id))
  );
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Text className="text-light-100 text-xs mt-0.5">
              ⭐ {movie?.vote_average?.toFixed(1)}
            </Text>
            <Text className="text-light-200 text-sm">
              ( {movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row gap-2 justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$ ${movie?.budget / 1000000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$ ${Math.round(movie?.revenue) / 1000000} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={`${movie?.production_companies
              .map((c) => c.name)
              .join(" - ")}`}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="p-2 flex-row items-center justify-start gap-2 my-2"
        onPress={router.back}
      >
        <BackIcon color="#ffffff" height={24} width={24} />
        <Text className="text-white font-semibold">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Movie;
