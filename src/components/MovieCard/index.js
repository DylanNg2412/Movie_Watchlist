import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  CardActionArea,
} from "@mui/material";
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
      sx={{
        width: "100%",
        height: "80%",
        margin: "20px",
      }}
      onClick={() => {
        navigate("/movie-details/" + movie._id);
      }}
    >
      <img
        className="poster"
        src={
          "http://localhost:5000/" +
          (movie.image && movie.image !== ""
            ? movie.image
            : "uploads/default_image.png")
        }
        alt={movie.title}
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
    </Card>
  );
}
