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
  MenuItem,
  Paper,
  Select,
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
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../utils/api_users";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

export default function UserPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { role, token } = currentUser;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNameID, setEditNameID] = useState("");

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const addNewUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      enqueueSnackbar("User successfully added", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      enqueueSnackbar("User has been successfully updated", {
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const handleUpdateUser = (user, role) => {
    updateUserMutation.mutate({
      ...user,
      role: role,
      token: token,
    });
  };

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      enqueueSnackbar("User has been deleted", {
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
                Users
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
                  navigate("/user-add");
                }}
              >
                Add New
              </Button>
            </Box>
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
                      width={"50%"}
                    >
                      NAME
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                      }}
                      width={"30%"}
                    >
                      ROLE
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                      }}
                      align="right"
                    >
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell
                          sx={{
                            color: "black",
                            fontSize: "15px",
                            fontWeight: "bold",
                          }}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell>
                          <Select
                            disabled={currentUser._id === user._id}
                            sx={{
                              color: "black",
                              fontSize: "15px",
                              fontWeight: "bold",
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={user.role}
                            onChange={(event) => {
                              handleUpdateUser(user, event.target.value);
                            }}
                          >
                            <MenuItem value={"user"}>USER</MenuItem>
                            <MenuItem value={"admin"}>ADMIN</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="right">
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
                              onClick={() => {
                                // open the edit modal
                                setOpenEditModal(true);
                                // set the edit genre field to its name as value
                                setEditName(user.name);
                                // set the edit genre id so that we know which genre to update
                                setEditNameID(user._id);
                              }}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              disabled={currentUser._id === user._id}
                              onClick={() =>
                                deleteUserMutation.mutate({
                                  _id: user._id,
                                  token: token,
                                })
                              }
                            >
                              <DeleteIcon />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No Users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
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
            </div>

            <Dialog
              open={openEditModal}
              onClose={() => setOpenEditModal(false)}
            >
              <DialogTitle>Edit User</DialogTitle>
              <DialogContent>
                <TextField
                  label="Name"
                  variant="outlined"
                  sx={{ width: "100%", marginTop: "15px" }}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
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
                    updateUserMutation.mutate({
                      _id: editNameID,
                      name: editName,
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
