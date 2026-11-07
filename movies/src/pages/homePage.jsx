import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import RateMovieIcon from "../components/cardIcons/addRating";
const HomePage = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  const playlist = movies.filter((m) => m.playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  const addToPlaylist = (movieId) => true;

  const ratings = movies.filter((m) => m.rating);
  localStorage.setItem("ratings", JSON.stringify(ratings));
  const addRating = (movieId) => true;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToPlaylistIcon movie={movie} />
            <RateMovieIcon movie={movie} />
          </>
        );
      }}
    />
  );
};

export default HomePage;