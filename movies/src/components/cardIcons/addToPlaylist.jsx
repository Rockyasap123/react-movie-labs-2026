//This component is used to add a movie to the user's watchlist. 
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToPlaylistIcon = ({ movie }) => {

  const context = useContext(MoviesContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
  };
  
  return (
    <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;