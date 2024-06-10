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
    enabled: !!token,
  });

  return (
    <>
      {currentUser && currentUser.role ? (
        <>
          <Header />
          <Container maxWidth={false} sx={{ color: "white" }}>
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
              {watchlist && watchlist.length > 0 ? (
                watchlist.map((m) => {
                  const { movie } = m;
                  return (
                    <Grid key={movie._id} item sm={6} md={2} xs={12}>
                      <MovieCard movie={movie} isInWatchlist={true} />
                    </Grid>
                  );
                })
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
                  color: "white",
                  fontWeight: "bold",
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
      ) : (
        <Container
          maxWidth="lg"
          sx={{
            color: "white",
            marginTop: 4,
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center", // To ensure text is centered as well
          }}
        >
          <Typography fontSize={"150px"}>UwU</Typography>
          <Typography fontSize={"40px"}>Watchu doin?</Typography>
          <Button
            onClick={() => {
              navigate("/");
            }}
            sx={{
              color: "black",
              backgroundColor: "#f5c518",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            HOME
          </Button>
        </Container>
      )}
    </>
  );
}
