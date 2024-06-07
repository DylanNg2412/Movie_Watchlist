import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import MoviesAddNew from "../MoviesAddNew";
import {
  addMovie,
  getMovies,
  deleteMovie,
  updateMovie,
} from "../../utils/api_movies";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

export default function MovieEditList() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;
  // const [openEditModal, setOpenEditModal] = useState(false);
  // const [movie, setMovie] = useState("");
  // const [editMovieName, setEditMovieName] = useState("");
  // const [editMovieID, setEditMovieID] = useState("");

  const {
    data: movies = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies("", "all", ""),
    onSuccess: (data) => {
      console.log("Fetched movies:", data);
    },
    onError: (error) => {
      console.error("Error fetching mvoies:", error);
    },
  });

  // const addNewMovieMutation = useMutation({
  //   mutationFn: addMovie,
  //   onSuccess: () => {
  //     enqueueSnackbar("Movie successfully added", {
  //       variant: "success",
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ["movies"],
  //     });
  //   },
  //   onError: (error) => {
  //     alert(error.response.data.message);
  //   },
  // });

  const updateMovieMutation = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      // display success message
      enqueueSnackbar("Movie has been updated successfully.", {
        variant: "success",
      });
      // reset the genres data
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
      // navigate back to home
      navigate("/");
    },
    onError: (error) => {
      // display error message
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
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
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  return (
    <>
      <Header />

      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              marginLeft: "10px",
              marginTop: "10px",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Movies
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/add");
            }}
          >
            Add New
          </Button>
        </div>
        {/* <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        padding: "20px",
        marginBottom: "20px",
        border: "1px solid #ddd",
      }}
    >
      <TextField
        label="Genre Name"
        variant="outlined"
        sx={{ width: "100%" }}
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => {
          addNewGenreMutation.mutate({
            name: genre,
            token: token,
          });
        }}
      >
        Add
      </Button>
    </Box> */}
        <Table>
          <TableHead>
            <TableRow align="center">
              <TableCell width={"70%"}>Title</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.length > 0 ? (
              movies.map((movie) => {
                return (
                  <TableRow key={movie._id}>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            navigate("/movies/" + movie._id);
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            deleteMovieMutation.mutate({
                              _id: movie._id,
                              token: token,
                            });
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No movies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <DialogTitle>Edit Genre</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          sx={{ width: "100%", marginTop: "15px" }}
          value={editGenreName}
          onChange={(e) => setEditGenreName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            updateGenreMutation.mutate({
              _id: editGenreID,
              name: editGenreName,
              token: token,
            });
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog> */}
      </Container>
    </>
  );
}
