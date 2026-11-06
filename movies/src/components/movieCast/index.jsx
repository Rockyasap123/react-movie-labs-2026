import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import imgPlaceholder from "../../images/film-poster-placeholder.png";

const MovieCast = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieCredits", { id }],
    queryFn: getMovieCredits,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loading cast details.</p>;

  const cast = data.cast || [];

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        Cast
      </Typography>

      <ImageList
        cols={cast.length}
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          overflowY: "hidden",
          gap: "16px !important",
          pb: 2,
          m: 0,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: 4,
          },
        }}
      >
        {cast.map((actor) => (
          <ImageListItem
            key={actor.id}
            sx={{
              minWidth: "160px",
              width: "160px",
              flexShrink: 0,
              listStyle: "none",
            }}
          >
        
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                sx={{ height: 200 }}
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : imgPlaceholder
                }
                title={actor.name}
              />
              <CardContent sx={{ p: 2.0, "&:last-child": { pb: 1.5 } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }} noWrap>
                  {actor.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap component="p">
                  {actor.character}
                </Typography>
              </CardContent>
            </Card>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default MovieCast;