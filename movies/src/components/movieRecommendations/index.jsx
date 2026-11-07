/** This displays the movie recommendations for the user based on their preferences and viewing history. 
 * It fetches data from the backend API and renders a list of recommended movies with their titles, posters, and brief descriptions. 
 * Users can click on a movie to view more details or add it to their watchlist. The component also handles loading states and error messages to enhance user experience.
 */

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import MovieCard from "../movieCard";
import AddToPlaylistIcon from "../cardIcons/addToPlaylist";



const MovieRecommendations = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieRecommendations", { id }],
    queryFn: getMovieRecommendations,
  });

    if (isLoading) {
    return <Spinner />;
    }

    if (isError) {
    return <p>Error loading movie recommendations.</p>;
    }

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        Recommended Movies
      </Typography>

      <ImageList
        cols={data.results.length}
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          overflowY: "hidden",
          gap: "16px",
          pb: 2,
          m: 0,
          //https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::-webkit-scrollbar
          //https://mui.com/system/getting-started/the-sx-prop/
          "&::-webkit-scrollbar": {
            height: 5,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 4,
          },
        }}
      >
        {data.results.map((movie) => (
          <ImageListItem 
            key={movie.id} 
            sx={{ 
              minWidth: "180px", 
              width: "290px",
                maxWidth: "300px",
                flexShrink: 0,
              listStyle: "none" 
            }}
          >
            <MovieCard 
              movie={movie} 
              action={(movie) => <AddToPlaylistIcon movie={movie} />} 
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default MovieRecommendations;