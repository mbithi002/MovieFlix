import { SearchIcon } from "@/assets/icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../services/api";
import useFetch from "../services/useFetch";

const Index = () => {
  const router = useRouter();

  const {
    data: movieData,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <Image
        source={require("../../assets/images/home-bg.jpg")}
        className="absolute w-full z-0 brightness-[40%] object-cover"
        resizeMode="cover"
      />

      <View className="flex-1 px-5">
        {/* Loading Indicator */}
        {moviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-white text-center mt-10">
            Error: {moviesError.message}
          </Text>
        ) : (
          <>
            <View className="flex flex-row items-center justify-between py-4 w-full h-[10%] my-2 border-accent mt-20">
              {/* Logo */}
              <View>
                <Image
                  source={require("../../assets/images/home-header.jpg")}
                  className="w-16 h-12 rounded-full m-auto"
                />
              </View>

              <Text className="text-3xl text-accent font-bold">MovieFlix</Text>
              {/* Search icon */}
              <View className="flex items-center justify-center p-2 bg-dark-100 rounded-full">
                <Link href={"/Search"}>
                  <SearchIcon
                    height={32}
                    width={32}
                    color={"#ab8bff"}
                    className="object-contain"
                  />
                </Link>
              </View>
            </View>

            {/* Movies Title */}
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>

            {/* Movie List */}
            <FlatList
              data={movieData?.results || []}
              // @ts-ignore
              renderItem={({ item }) => <MovieCard movie={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 4,
                marginBottom: 10,
              }}
              contentContainerStyle={{
                paddingBottom: 100,
                flexGrow: 1,
              }}
              className="mt-2"
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Index;
