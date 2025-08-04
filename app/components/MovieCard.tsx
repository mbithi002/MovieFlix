import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
};

type Props = {
  movie: Movie;
  onPress?: () => void;
};

const MovieCard = ({ movie }: Props) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link href={`/movie/${movie?.id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <View className="rounded-xl overflow-hidden bg-dark-200">
          <Image
            source={{ uri: posterUrl }}
            className="w-full h-56"
            resizeMode="cover"
          />
          <View className="p-2">
            <Text
              numberOfLines={1}
              className="text-white font-semibold text-base"
            >
              {movie.title}
            </Text>
            <Text className="text-light-200 text-xs mt-1">
              {new Date(movie.release_date).getFullYear()}
            </Text>
            <Text className="text-light-100 text-xs mt-0.5">
              ⭐ {movie.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

// import { View, Text, Image, TouchableOpacity } from 'react-native'
// import React from 'react'

// type MovieCardProps = {
//   movie: {
//     id: number
//     title: string
//     poster_path: string | null
//     vote_average: number
//     release_date: string
//     overview?: string
//     genre_ids?: number[]
//     [key: string]: any
//   }
//   onPress?: () => void
// }

// const MovieCard = ({ movie, onPress }: MovieCardProps) => {
//   const imageUrl = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//     : 'https://via.placeholder.com/500x750?text=No+Poster'

//   return (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       onPress={onPress}
//       className="w-full mb-4 rounded-xl overflow-hidden"
//     >
//       {/* Movie Poster with Rating */}
//       <View className="relative">
//         <Image
//           source={{ uri: imageUrl }}
//           className="w-full h-64 rounded-xl"
//           resizeMode="cover"
//         />

//         {/* Rating Badge */}
//         <View className="absolute top-2 right-2 bg-dark-100/90 px-2 py-1 rounded-full flex-row items-center">
//           <Text className="text-accent font-bold text-sm">⭐</Text>
//           <Text className="text-light-100 font-bold text-sm ml-1">
//             {movie.vote_average.toFixed(1)}
//           </Text>
//         </View>
//       </View>

//       {/* Movie Details */}
//       <View className="mt-3">
//         <Text
//           className="text-light-100 font-bold text-lg"
//           numberOfLines={1}
//         >
//           {movie.title}
//         </Text>

//         <Text className="text-light-300 text-sm mt-1">
//           {movie.release_date?.split('-')[0] || 'N/A'}
//         </Text>

//         {movie.overview && (
//           <Text
//             className="text-light-300 text-xs mt-2"
//             numberOfLines={2}
//           >
//             {movie.overview}
//           </Text>
//         )}
//       </View>
//     </TouchableOpacity>
//   )
// }

// export default MovieCard
