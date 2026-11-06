//this page is for the popular movies page, it will display the popular movies in a grid format
import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getPopularMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const PopularMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    getPopularMovies().then(movies => {
        setMovies(movies);
    });
    }, []);

    return (
        <PageTemplate
            title="Popular Movies"
            movies={movies}
            action={(movie) => {
                return <AddToPlaylistIcon movie={movie} />;
            }}
        />
    );
};

export default PopularMoviesPage;
