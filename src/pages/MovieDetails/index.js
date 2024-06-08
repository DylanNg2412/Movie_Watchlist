import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Container,
  Grid,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getMovie } from "../../utils/api_movies";
import { addToWatchlist } from "../../utils/api_watchlist";

export default function MovieDetails() {
  const { id } = useParams();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [inWatchlist, setIsInWatchlist] = useState(false);

  const { data: movie = {} } = useQuery({
    queryKey: ["movie", id, token],
    queryFn: () => getMovie(id, token),
  });

  const addToWatchlistMutation = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: () => {
      enqueueSnackbar("Movie has been added to your watchlist", {
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
    <>
      <Grid
        container
        spacing={2}
        columns={12}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }} // This ensures the content is vertically centered
      >
        <Grid item xs={5}>
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={"bold"}>
                Title: {movie.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight={"bold"}>{movie.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight={"bold"}>
                Country: {movie.country}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight={"bold"}>
                Genres: {movie.genres?.map((genre) => genre.name).join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight={"bold"}>
                Released Date: {movie.release_date}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight={"bold"}>
                Director: {movie.director}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight={"bold"}>Cast: {movie.cast}</Typography>
            </Grid>
            {!inWatchlist && (
              <Grid item xs={12}>
                <Button
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
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={16} textAlign="center">
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowBackIcon sx={{ mr: 1 }} /> Back To Watchlist
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
