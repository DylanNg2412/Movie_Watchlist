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

  const handleUpdateUser = (users, role) => {
    updateUserMutation.mutate({
      ...users,
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
            Users
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/user-add");
            }}
          >
            Add New
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={"50%"}>NAME</TableCell>
              <TableCell width={"30%"}>ROLE</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Select
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

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowBackIcon sx={{ mr: 1 }} /> Back
          </Button>
        </div>

        <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              sx={{ width: "100%", marginTop: "15px" }}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              sx={{ width: "100%", marginTop: "15px" }}
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
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
                updateUserMutation.mutate({
                  _id: editNameID,
                  name: editName,
                  email: editEmail,
                  token: token,
                });
              }}
            >
              <UpdateIcon />
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
