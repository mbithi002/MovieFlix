import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { fetchMovies } from "../services/api";
import { updateSearchCount } from "../services/appwrite";
import useFetch from "../services/useFetch";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const {
    data: movieData,
    loading: moviesLoading,
    error: moviesError,
    refetch,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        refetch();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    //@ts-ignore
    if (searchQuery.trim() && movieData?.results?.length > 0) {
      //@ts-ignore
      updateSearchCount(searchQuery, movieData.results[0]);
    }
  }, [movieData]);

  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <Image
        source={require("../../assets/images/home-bg.jpg")}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movieData?.results || []}
        // @ts-ignore
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 4,
          marginBottom: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className="w-full flex-row justify-center mt-2 items-center">
              <Image
                source={require("../../assets/images/home-header.jpg")}
                className="w-12 h-10 mt-20 mb-5 mx-auto"
              />
            </View>

            {/* Search Bar */}
            <View className="">
              <SearchBar
                placeHolder="Search movies"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {/* Loading / Error / Results Info */}
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color={"#0000ff"}
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              // @ts-ignore
              movieData?.results?.length > 0 && (
                <Text className="text-white font-bold mb-2">
                  Search results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movieData?.results?.length === 0 && (
                <Text className="text-white text-center my-3">
                  No results found for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <Text className="text-center text-white my-2">
              {searchQuery.trim() ? "No movies found" : "Search for a Movie"}
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
