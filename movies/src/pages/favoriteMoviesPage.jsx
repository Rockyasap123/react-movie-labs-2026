import PageTemplate from "../components/templateMovieListPage";
import { getMovie, getMovieImages } from "../api/tmdb-api";


const FavoriteMoviesPage = (props) => {
  const toDo = () => true;
  // Get movies from local storage.
  const movies = JSON.parse(localStorage.getItem("favorites")); 

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      selectFavorite={toDo}
    />
  );
};

export default FavoriteMoviesPage;
