import { SearchIcon } from "@/assets/icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MovieCard from "../components/MovieCard";
import TrendingMovieCard from "../components/TrendingMovieCard";
import { fetchMovies } from "../services/api";
import { getTrendingMovies } from "../services/appwrite";
import useFetch from "../services/useFetch";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SkeletonBox = ({ width, height, className = "" }: any) => (
  <View
    style={{ width, height }}
    className={`bg-dark-200 rounded-md animate-pulse ${className}`}
  />
);

const Index = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovies());

  const {
    data: movieData,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  const isLoading = trendingLoading || moviesLoading;
  const hasError = trendingError || moviesError;

  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <Image
        source={require("../../assets/images/home-bg.jpg")}
        className="absolute w-full z-0 brightness-[40%] object-cover"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5 pt-20"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between py-4">
          <Image
            source={require("../../assets/images/home-header.jpg")}
            className="w-16 h-12 rounded-full"
          />

          <Text className="text-3xl text-accent font-bold">MovieFlix</Text>

          <TouchableOpacity className="p-2 bg-dark-100 rounded-full">
            <Link href={"/Search"}>
              <SearchIcon height={32} width={32} color={"#ab8bff"} />
            </Link>
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {hasError && (
          <Text className="text-white text-center mt-10">
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        )}

        {/* Trending Movies */}
        <Text className="text-white text-lg font-bold mt-8 mb-2">
          Trending Movies
        </Text>

        {isLoading ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(5)].map((_, i) => (
              <SkeletonBox key={i} width={120} height={180} className="mr-4" />
            ))}
          </ScrollView>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingMovies?.map((item, index) => (
              <TrendingMovieCard
                index={parseInt(index)}
                key={item.movie_id}
                poster_url={item.poster_url}
                title={item.title}
                onPress={() => console.log(`Selected: ${item.title}`)}
              />
            ))}
          </ScrollView>
        )}

        {/* Latest Movies */}
        <Text className="text-lg text-white font-bold mt-8 mb-3">
          Latest Movies
        </Text>

        <View className="flex-row flex-wrap justify-between gap-y-4">
          {isLoading
            ? [...Array(9)].map((_, i) => (
                <SkeletonBox
                  key={i}
                  width={(SCREEN_WIDTH - 60) / 3}
                  height={170}
                />
              ))
            : movieData?.results?.map((movie) => (
                //@ts-ignore
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
