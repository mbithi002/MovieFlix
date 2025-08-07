import { Client, Databases, ID, Query } from "react-native-appwrite";

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const PLATFORM = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_METRICS!;
const endpoint = 'https://cloud.appwrite.io/v1';

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(PROJECT_ID)
    .setPlatform(PLATFORM)

const database = new Databases(client)

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    [key: string]: any;
};

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            //@ts-ignore
            [Query.equal('searchTerm', query)]
        )
        // console.log(result)
        if (result.documents.length > 0) {
            const exsistingMovie = result.documents[0];
            const res = await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                exsistingMovie.$id,
                {
                    count: exsistingMovie.count + 1
                }
            )
            // console.log('update>>>', res)
        } else {
            const res = await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movie_id: movie.id,
                    title: movie.title
                }
            )
            // console.log('create>>', res)
        }
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | void> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.limit(5),
                Query.orderDesc('count'),
            ]
        )
        return result.documents as unknown as TrendingMovie[]
    } catch (error) {
        console.log(error)
        return undefined
    }
}