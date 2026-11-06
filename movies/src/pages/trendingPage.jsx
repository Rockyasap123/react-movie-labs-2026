//This page is for movies that are trending, it will display the trending movies in a grid format
import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getTrendingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const TrendingPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getTrendingMovies().then(movies => {
            setMovies(movies);
        });
    }, []);

    return (
        <PageTemplate
            title="Trending Movies"
            movies={movies}
            action={(movie) => {
                return <AddToPlaylistIcon movie={movie} />;
            }}
        />
    );
}

export default TrendingPage;