import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { fetchMovies } from "../services/api";
import useFetch from "../services/useFetch";

const index = () => {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={require("../../assets/images/home-bg.jpg")}
        className="absolute w-full z-0 brightness-[40%] object-cover"
      />
      <View className="flex-1 bg-primary">
        <Image
          source={require("../../assets/images/home-bg.jpg")}
          className="absolute w-full z-0 brightness-[40%] object-cover"
        />
        <View className="flex-1 px-5">
          <Image
            source={require("../../assets/images/home-header.jpg")}
            className="w-12 h-10 mt-20 mb-5 mx-auto"
          />
          {moviesLoading ? (
            <ActivityIndicator
              size={"large"}
              color={"#0000ff"}
              className="mt-10 self-center"
            />
          ) : moviesError ? (
            <Text>Error: {moviesError?.message}</Text>
          ) : (
            <>
              <SearchBar
                onPress={() => router.push("/Search")}
                placeHolder="Search for a movie"
              />
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard
                    movie={item}
                    // onPress={() => router.push(`/movies/${item.id}`)}
                  />
                )}
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
    </View>
  );
};

export default index;
