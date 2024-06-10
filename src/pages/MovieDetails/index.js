import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";
import {
  Typography,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import { getMovie } from "../../utils/api_movies";
import {
  addToWatchlist,
  getWatchlists,
  getWatchlist,
  updateWatchlist,
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
  const [status, setStatus] = useState("");

  /* for dialog */
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* end - dialog*/

  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist", id, token],
    queryFn: () => getWatchlist(id, token),
    enabled: !!token,
  });

  const { data: movie = {} } = useQuery({
    queryKey: ["movie", id, token],
    queryFn: () => getMovie(id, token),
  });

  const addToWatchlistMutation = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: (data) => {
      enqueueSnackbar("Movie has been added to your watchlist", {
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

  const updateMovieMutation = useMutation({
    mutationFn: updateWatchlist,
    onSuccess: (data) => {
      console.log(data);
      enqueueSnackbar("Status has been successfully updated", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["movie", id, token],
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const handleUpdateMovie = (movie_id) => {
    updateMovieMutation.mutate({
      _id: movie_id,
      status: status,
      token: token,
    });
    handleClose();
  };

  const handleAddToWatchlist = () => {
    if (!currentUser.role) {
      enqueueSnackbar(
        "You need to be logged in to add a movie to your watchlist",
        {
          variant: "warning",
        }
      );
    } else {
      addToWatchlistMutation.mutate({
        movie_id: movie._id,
        token,
      });
    }
  };

  useEffect(() => {
    if (watchlist) {
      setStatus(watchlist.status);
    } else {
      setIsInWatchlist(false);
    }
  }, [watchlist]);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Box
                  component="img"
                  src={
                    movie.image
                      ? `http://localhost:5000/${movie.image}`
                      : "/default_image.png"
                  }
                  alt={movie.title}
                  sx={{ width: "100%", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h3" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography paragraph>{movie.description}</Typography>
                <Typography>
                  Country: <strong>{movie.country}</strong>
                </Typography>
                <Typography>
                  Genres:
                  <strong>
                    {" "}
                    {movie.genres?.map((genre) => genre.name).join(", ")}
                  </strong>
                </Typography>
                <Typography>
                  Released Date: <strong>{movie.release_date}</strong>
                </Typography>
                <Typography>
                  Director: <strong>{movie.director}</strong>
                </Typography>
                <Typography>
                  Cast: <strong>{movie.cast}</strong>
                </Typography>

                {currentUser.role && watchlist ? (
                  <>
                    <Typography>
                      Status: <strong>{status}</strong>
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      sx={{ marginTop: 3 }}
                    >
                      <Grid item xs={12} sm={6}>
                        <Button
                          fullWidth
                          sx={{
                            backgroundColor: "#f5c518",
                            color: "black",
                            fontWeight: "bold",
                          }}
                          onClick={handleClickOpen}
                        >
                          Edit Status
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>Edit Movie Status</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Change the status of the movie.
                            </DialogContentText>
                            <FormControl fullWidth>
                              <Select
                                labelId="status-select-label"
                                id="status-select"
                                value={status}
                                onChange={(event) => {
                                  setStatus(event.target.value);
                                }}
                              >
                                <MenuItem value={"Want to watch"}>
                                  Want to watch
                                </MenuItem>
                                <MenuItem value={"Watching"}>Watching</MenuItem>
                                <MenuItem value={"Watched"}>Watched</MenuItem>
                              </Select>
                            </FormControl>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleUpdateMovie(movie._id)}
                              color="primary"
                            >
                              Save
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button
                          fullWidth
                          sx={{
                            backgroundColor: "#f5c518",
                            color: "black",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            addToWatchlistMutation.mutate({
                              movie_id: movie._id,
                              token,
                            })
                          }
                        >
                          <CheckIcon sx={{ mr: 1 }} />
                          In Watchlist
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "#f5c518",
                      color: "black",
                      fontWeight: "bold",
                      mt: 3,
                    }}
                    onClick={handleAddToWatchlist}
                  >
                    <AddIcon sx={{ mr: 1 }} />
                    Add To Watchlist
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <Box textAlign="center" sx={{ py: 2 }}>
            <Button
              onClick={() => navigate("/")}
              sx={{
                backgroundColor: "#f5c518",
                color: "black",
                fontWeight: "bold",
              }}
              endIcon={<ArrowBackIcon />}
            >
              Back To Watchlist
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
}
