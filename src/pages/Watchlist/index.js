import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Typography, Button, Box, Grid, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getWatchlists, removeFromWatchlist } from "../../utils/api_watchlist";
import Header from "../../components/Header";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import { useCookies } from "react-cookie";

export default function Watchlist() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;

  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist", token],
    queryFn: () => getWatchlists(token),
  });

  const deleteWatchlistMutation = useMutation({
    mutationFn: removeFromWatchlist,
    onSuccess: () => {
      enqueueSnackbar("Watchlist is deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
    onError: (error) => {
      // Display error message
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const handleWatchlistDelete = (_id) => {
    const confirm = window.confirm("Remove this movie in your watchlist?");
    if (confirm) {
      deleteWatchlistMutation.mutate({ _id: _id, token: token });
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ paddingTop: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></Box>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Your Watchlist
        </Typography>
        <Grid item container spacing={3} sx={{ paddingTop: "20px" }}>
          {watchlist && watchlist.length > 0 ? (
            watchlist.map((item) => (
              <React.Fragment key={item._id}>
                {item.movies.map((movie) => (
                  <Grid key={movie._id} item lg={4} md={6} xs={12}>
                    <MovieCard movie={movie} isInWatchlist={true} />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleWatchlistDelete(item._id);
                      }}
                    >
                      Remove
                    </Button>
                  </Grid>
                ))}
              </React.Fragment>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" sx={{ padding: "10px 0" }}>
                No movies added to your watchlist yet.
              </Typography>
            </Grid>
          )}
        </Grid>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
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
            <ArrowBackIcon sx={{ mr: 1 }} /> Back to home page
          </Button>
        </div>
      </Container>
    </>
  );
}
