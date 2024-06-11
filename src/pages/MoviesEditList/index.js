import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Header from "../../components/Header";
import { getMovies, deleteMovie } from "../../utils/api_movies";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

export default function MovieEditList() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;

  const { data: movies = [] } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies("", "all", ""),
    onSuccess: (data) => {
      console.log("Fetched movies:", data);
    },
    onError: (error) => {
      console.error("Error fetching movies:", error);
    },
  });

  const deleteMovieMutation = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      enqueueSnackbar("Successfully deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClickOpen = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  const handleDelete = () => {
    if (selectedMovie) {
      deleteMovieMutation.mutate({
        _id: selectedMovie._id,
        token: token,
      });
      handleClose();
    }
  };

  return (
    <>
      {currentUser && currentUser.role ? (
        <>
          <Header />
          <Container
            sx={{
              mt: 4,
              maxWidth: "lg",
              textTransform: "uppercase",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                padding: "0 10px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Movies
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#008000",
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                }}
                onClick={() => {
                  navigate("/add");
                }}
              >
                Add Movie
              </Button>
            </Box>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "#1c1c1e", mb: 3, width: "100%" }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#f5c518",
                      borderBottom: "2px solid black",
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Title
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  {movies.length > 0 ? (
                    movies.map((movie, index) => (
                      <TableRow key={movie._id}>
                        <TableCell
                          sx={{
                            color: "black",
                            fontSize: "15px",
                            fontWeight: "bold",
                          }}
                        >
                          {movie.title}
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: 1,
                            }}
                          >
                            <Button
                              variant="contained"
                              sx={{ color: "white" }}
                              onClick={() => {
                                navigate("/movies/" + movie._id);
                              }}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#f44336",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#d32f2f",
                                },
                              }}
                              onClick={() => handleClickOpen(movie)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        align="center"
                        sx={{ color: "white" }}
                      >
                        No movies found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  navigate("/dashboard");
                }}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowBackIcon sx={{ mr: 1 }} /> Back
              </Button>
            </Box>
          </Container>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the movie "
                {selectedMovie?.title}"?
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button
                onClick={handleDelete}
                sx={{
                  color: "black",
                  border: "1px solid black",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#43a047",
                    border: "1px solid #43a047",
                  },
                }}
              >
                Yes
              </Button>
              <Button
                onClick={handleClose}
                sx={{
                  color: "black",
                  border: "1px solid black",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#d32f2f",
                    border: "1px solid #d32f2f",
                  },
                }}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
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
