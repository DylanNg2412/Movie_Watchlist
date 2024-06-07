import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import { Typography, Button, Card, CardContent, Box } from "@mui/material";
import { deleteMovie } from "../../utils/api_movies";
import { addToWatchlist } from "../../utils/api_watchlist";

export default function MovieCard({ movie = {}, isInWatchlist = false }) {
  console.log(movie);
  const [inWatchlist, setIsInWatchlist] = useState(isInWatchlist);
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const deleteMovieMutation = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      enqueueSnackbar("Movie is deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
    onError: (error) => {
      //display error message
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const handleMovieDelete = (event) => {
    event.preventDefault();
    const confirm = window.confirm("Are you sure to delete this movie ?");
    if (confirm) {
      deleteMovieMutation.mutate({
        _id: movie._id,
        token: token,
      });
    }
  };

  const addToWatchlistMutation = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: () => {
      enqueueSnackbar("Product has been added to your watchlist", {
        variant: "success",
      });
      setIsInWatchlist(true);
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  return (
    <Card sx={{ maxWidth: { xs: "100%", sm: "500px" }, margin: "auto" }}>
      <CardContent>
        <Box
          sx={{
            width: "100%",
            height: 0,
            paddingBottom: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
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
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>

        <Typography fontWeight={"bold"}>{movie.title}</Typography>

        {!inWatchlist && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              if (currentUser && currentUser.email) {
                addToWatchlistMutation.mutate({
                  movie: movie,
                  token: token,
                });
              } else {
                enqueueSnackbar("Please login first");
              }
            }}
            sx={{ marginBottom: "10px" }}
          >
            Add To Watchlist
          </Button>
        )}

        {/* {role && role === "admin" && !inWatchlist ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: "17px", marginBottom: { xs: "10px", sm: 0 } }}
              color="primary"
              onClick={() => {
                navigate("/movies/" + movie._id);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: "17px" }}
              color="error"
              onClick={handleMovieDelete}
            >
              Delete
            </Button>
          </Box>
        ) : null} */}
      </CardContent>
    </Card>
  );
}
