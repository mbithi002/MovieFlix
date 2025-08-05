export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN!,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN!}`,
    },
};

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    [key: string]: any;
};

type FetchMoviesResponse = {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
};

export const fetchMovies = async ({
    query,
}: {
    query?: string;
}): Promise<FetchMoviesResponse> => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Failed to fetch movies: ${message}`);
    }

    const data = await response.json();
    return data;
};
