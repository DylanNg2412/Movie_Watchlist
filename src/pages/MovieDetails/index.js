import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import { getMovie } from "../../utils/api_movies";
import {
  addToWatchlist,
  getWatchlists,
  removeFromWatchlist,
  updateWatchlist, // Make sure you have this function in your api_watchlist
} from "../../utils/api_watchlist";
import Header from "../../components/Header";

export default function MovieDetails() {
  const { id } = useParams();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const [inWatchlist, setIsInWatchlist] = useState(false);
  const [status, setStatus] = useState(""); // New state for status

  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist", token],
    queryFn: () => getWatchlists(token),
  });

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
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const deleteWatchlistMutation = useMutation({
    mutationFn: removeFromWatchlist,
    onSuccess: () => {
      enqueueSnackbar("Movie has been removed from your watchlist", {
        variant: "success",
      });
      setIsInWatchlist(false);

      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateWatchlist, // Assuming this is the function to update the status
    onSuccess: () => {
      enqueueSnackbar("Status updated successfully", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  useEffect(() => {
    const watchlistItem = watchlist.find((item) =>
      item.movies.some((m) => m._id.toString() === movie._id)
    );
    if (watchlistItem) {
      setIsInWatchlist(true);
      setStatus(watchlistItem.status); // Assuming the watchlist item has a status field
    }
  }, [watchlist, movie._id]);

  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        columns={12}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "90vh" }}
      >
        <Grid item xs={4}>
          <Box
            sx={{
              width: "65%",
              height: "100%",
              margin: "auto",
              borderRadius: "5px",
            }}
            component="img"
            src={
              "http://localhost:5000/" +
              (movie.image && movie.image !== ""
                ? movie.image
                : "uploads/default_image.png")
            }
            alt={movie.title}
          />
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3">{movie.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{movie.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Country: <strong>{movie.country}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Genres:{" "}
                <strong>
                  {movie.genres?.map((genre) => genre.name).join(", ")}
                </strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Released Date: <strong>{movie.release_date}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Director: <strong>{movie.director}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Cast: <strong>{movie.cast}</strong>
              </Typography>
            </Grid>
            {inWatchlist ? (
              <Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (currentUser && currentUser.email) {
                        deleteWatchlistMutation.mutate({
                          _id: movie._id,
                          token,
                        });
                      } else {
                        enqueueSnackbar("Please login first", {
                          variant: "warning",
                        });
                      }
                    }}
                    sx={{ marginBottom: "10px" }}
                  >
                    <CheckIcon sx={{ marginRight: "10px" }} />
                    In Watchlist
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (currentUser && currentUser.email) {
                      addToWatchlistMutation.mutate({ movie, token });
                    } else {
                      enqueueSnackbar("Please login first", {
                        variant: "warning",
                      });
                    }
                  }}
                  sx={{ marginBottom: "10px" }}
                >
                  <AddIcon sx={{ marginRight: "10px" }} />
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
              marginLeft: "10px",
            }}
          >
            <ArrowBackIcon sx={{ mr: 1 }} /> Back To Watchlist
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
