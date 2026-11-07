import React, {useContext, useState} from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { MoviesContext } from "../../contexts/moviesContext";

const RateMovieIcon = ({movie}) => {
  const context = useContext(MoviesContext);
  const [value, setValue] = useState(context.ratings[movie.id] || 0);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
    context.addRating(movie, newValue);
  };

  return (
    <Box
      sx={{
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", px: 0 }} > 
      {/** https://mui.com/material-ui/react-rating/ **/}
        <Rating
          name={`rating-${movie.id}`}
          value={value}
          onChange={handleRatingChange}
          precision={1.0}
          defaultValue={2}
        />
            </Box>
  );
};

export default RateMovieIcon;
