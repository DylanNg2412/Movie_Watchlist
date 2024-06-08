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
  const { token, _id } = currentUser;

  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist", token],
    queryFn: () => getWatchlists(token),
  });

  const userWatchlist = watchlist.find((item) => item.user === _id);

  return (
    <>
      <Header />
      <Box sx={{ margin: "30px" }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Your Watchlist
        </Typography>
      </Box>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ margin: "30px" }}
      >
        {userWatchlist && userWatchlist.movies.length > 0 ? (
          userWatchlist.movies.map((movie) => (
            <Grid key={movie._id} item sm={6} md={2} xs={12}>
              <MovieCard movie={movie} isInWatchlist={true} />
            </Grid>
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
    </>
  );
}
