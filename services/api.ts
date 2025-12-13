const API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface FetchMoviesParams {
  query: string;
  page?: number;
}

export const fetchMovies = async ({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> => {
  try {
    // If query is empty, fetch popular movies
    const endpoint = query.trim()
      ? `${BASE_URL}/search/movie`
      : `${BASE_URL}/movie/popular`;

    const params = new URLSearchParams({
      page: page.toString(),
      ...(query.trim() && { query: query.trim() }),
    });

    const response = await fetch(`${endpoint}?${params}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
