import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { getUserSignUp } from "../../utils/api_auth";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, setCookies] = useCookies(["currentUser"]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getUserSignUpMutation = useMutation({
    mutationFn: getUserSignUp,
    onSuccess: (data) => {
      setCookies("currentUser", data, { maxAge: 60 * 60 * 24 * 30 }); //3600 * 24 = 24 hours * 30 = 1 month
      enqueueSnackbar("Login Successfully", { variant: "success" });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleSignUp = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      enqueueSnackbar("All fields are required", { variant: "error" });
    } else if (password !== confirmPassword) {
      enqueueSnackbar("Password must be match", { variant: "error" });
    } else {
      getUserSignUpMutation.mutate({
        name,
        email,
        password,
      });
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Card sx={{ mt: 4, border: "1px solid white" }}>
          <CardContent sx={{ backgroundColor: "#121212" }}>
            <Grid container spacing={3} sx={{ p: 2, color: "white" }}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Name
                </Typography>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Email
                </Typography>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Password
                </Typography>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Confirm Password
                </Typography>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    backgroundColor: "#f5c518",
                    textTransform: "capitalize",
                  }}
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography>Already have an account?</Typography>
                  <Button
                    sx={{ ml: 1 }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Log In
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
