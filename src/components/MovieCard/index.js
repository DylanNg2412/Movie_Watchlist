import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import { Typography, Button, Card, Box } from "@mui/material";
import { deleteMovie } from "../../utils/api_movies";
import { addToWatchlist } from "../../utils/api_watchlist";

export default function MovieCard(props) {
  const { movie = {}, isInWatchlist = false } = props;
  const [inWatchlist, setIsInWatchlist] = useState(isInWatchlist);
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return (
    <Card
      className="movie-card"
      onClick={() => {
        navigate("/movie-details/" + movie._id);
      }}
    >
      <Box
        component="img"
        src={
          "http://10.1.104.9:5000/" +
          (movie.image && movie.image !== ""
            ? movie.image
            : "uploads/default_image.png")
        }
        alt={movie.title}
      />
      <Box className="movie-card-overlay">
        <Typography
          variant="h6"
          className="movie-card-title"
          sx={{ textTransform: "uppercase" }}
        >
          {movie.title}
        </Typography>
      </Box>
    </Card>
  );
}
