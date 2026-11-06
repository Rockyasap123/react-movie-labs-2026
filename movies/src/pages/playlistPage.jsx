import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const PlaylistPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  // Fetch movie details for each movie ID saved in the playlist state
  const playlistQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isPending = playlistQueries.some((q) => q.isLoading === true);

  if (isPending) {
    return <Spinner />;
  }

    const movies = playlistQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Playlist Movies"
      movies={movies}
      action={(movie) => {

        return ( 
            <>
        < RemoveFromPlaylistIcon movie={movie} />
        </>
        );
      }}
    />
  );
};

export default PlaylistPage;