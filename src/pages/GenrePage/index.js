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
    },
    onError: (error) => {
      enqueueSnackbar(error.message.data.message, {
        variant: "error",
      });
    },
  });

  return (
    <Container>
      <Header />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            marginLeft: "10px",
            marginTop: "10px",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Genres
        </Typography>
      </div>
      <Box
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
          <AddIcon />
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={"70%"}>Name</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {genres.length > 0 ? (
            genres.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
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
                          // open the edit modal
                          setOpenEditModal(true);
                          // set the edit genre field to its name as value
                          setEditGenreName(item.name);
                          // set the edit genre id so that we know which genre to update
                          setEditGenreID(item._id);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          deleteGenreMutation.mutate({
                            _id: item._id,
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
                No genre found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
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
          <Button onClick={() => setOpenEditModal(false)}>
            <CloseIcon />
          </Button>
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
            <UpdateIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
