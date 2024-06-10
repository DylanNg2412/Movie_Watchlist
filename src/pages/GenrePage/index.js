import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import {
  addGenre,
  getGenres,
  deleteGenre,
  updateGenre,
} from "../../utils/api_genres";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import UpdateIcon from "@mui/icons-material/Update";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

export default function GenrePage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [genre, setGenre] = useState("");
  const [editGenreName, setEditGenreName] = useState("");
  const [editGenreID, setEditGenreID] = useState("");

  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });

  const addNewGenreMutation = useMutation({
    mutationFn: addGenre,
    onSuccess: () => {
      enqueueSnackbar("Genre successfully added", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["genres"],
      });
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const updateGenreMutation = useMutation({
    mutationFn: updateGenre,
    onSuccess: () => {
      // display success message
      enqueueSnackbar("Genre has been updated successfully.", {
        variant: "success",
      });
      // reset the genres data
      queryClient.invalidateQueries({
        queryKey: ["genres"],
      });
      // close modal
      setOpenEditModal(false);
    },
    onError: (error) => {
      // display error message
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const deleteGenreMutation = useMutation({
    mutationFn: deleteGenre,
    onSuccess: () => {
      enqueueSnackbar("Successfully deleted", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["genres"],
      });
      setOpenDeleteModal(false);
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedGenreDelete, setSelectedGenreDelete] = useState(null);

  const handleClickOpen = (genre) => {
    setSelectedGenreDelete(genre);
    setOpenDeleteModal(true);
  };

  const handleClose = () => {
    setOpenDeleteModal(false);
    setSelectedGenreDelete(null);
  };

  const handleGenreDelete = () => {
    if (selectedGenreDelete) {
      deleteGenreMutation.mutate({
        _id: selectedGenreDelete._id,
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
          <Container sx={{ mt: 4, maxWidth: "lg", textTransform: "uppercase" }}>
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
                Genres
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                padding: "20px",
                marginBottom: "20px",
                border: "1px solid #f5c518",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                backgroundColor: "#f5c518",
              }}
            >
              <TextField
                label="Genre Name"
                variant="outlined"
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "7px",
                }}
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
              <Button
                sx={{ backgroundColor: "#008000", color: "white" }}
                onClick={() => {
                  addNewGenreMutation.mutate({
                    name: genre,
                    token: token,
                  });
                  setGenre("");
                }}
              >
                <AddIcon />
              </Button>
            </Box>
            <Box sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
              <TableContainer component={Paper}>
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
                        name
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
                  <TableBody>
                    {genres.length > 0 ? (
                      genres.map((genre) => (
                        <TableRow key={genre._id}>
                          <TableCell
                            sx={{
                              color: "black",
                              fontSize: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            {genre.name}
                          </TableCell>
                          <TableCell align="right" sx={{ padding: "16px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "10px",
                              }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                  "&:hover": { backgroundColor: "#1e88e5" },
                                }}
                                onClick={() => {
                                  setOpenEditModal(true);
                                  setEditGenreName(genre.name);
                                  setEditGenreID(genre._id);
                                }}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                sx={{
                                  "&:hover": { backgroundColor: "#f44336" },
                                }}
                                onClick={() => handleClickOpen(genre)}
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
                          sx={{ padding: "16px" }}
                        >
                          No genre found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
              <Button
                onClick={() => {
                  navigate("/dashboard");
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
                <ArrowBackIcon sx={{ mr: 1 }} /> Back
              </Button>
            </Box>

            {/* Dialog for editing genre */}
            <Dialog
              open={openEditModal}
              onClose={() => setOpenEditModal(false)}
            >
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
                <Button
                  sx={{
                    color: "black",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#43a047",
                    },
                  }}
                  onClick={() => {
                    updateGenreMutation.mutate({
                      _id: editGenreID,
                      name: editGenreName,
                      token: token,
                    });
                  }}
                >
                  update
                </Button>
                <Button
                  sx={{
                    color: "black",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#d32f2f",
                    },
                  }}
                  onClick={() => setOpenEditModal(false)}
                >
                  cancel
                </Button>
              </DialogActions>
            </Dialog>
            {/* Dialog for editing genre - end */}

            {/* Dialog for deleting genre */}
            <Dialog open={openDeleteModal} onClose={handleClose}>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete the genre "
                  {selectedGenreDelete?.name}"?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleGenreDelete}
                  sx={{ color: "white", backgroundColor: "#f44336" }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setOpenDeleteModal(false)}
                  sx={{ color: "white", backgroundColor: "#43a047" }}
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
            {/* Dialog for deleting genre - end */}
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
