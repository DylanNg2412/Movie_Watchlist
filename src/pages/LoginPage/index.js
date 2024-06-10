import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

import { getUserLogin } from "../../utils/api_auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, setCookies] = useCookies(["currentUser"]); //note :currentUser is a key for the cookie

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUserLoginMutation = useMutation({
    mutationFn: getUserLogin,
    onSuccess: (data) => {
      // save current log in user data into cookie
      setCookies("currentUser", data, { maxAge: 60 * 60 * 24 * 30 }); //3600 * 24 = 24 hours * 30 = 1 month
      enqueueSnackbar("Login Successfully", { variant: "success" });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "danger" });
    },
  });

  const handleLogin = () => {
    if (email === "" || password === "") {
      enqueueSnackbar("All fields are required", { variant: " error" });
    } else {
      getUserLoginMutation.mutate({
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
                <Typography>Email</Typography>
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
                <Typography>Password</Typography>
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
                <Button
                  fullWidth
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    backgroundColor: "#f5c518",
                    textTransform: "capitalize",
                  }}
                  onClick={handleLogin}
                >
                  Login
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
                  <Typography>Don't have an account yet?</Typography>
                  <Button
                    sx={{ ml: 1, textTransform: "capitalize" }}
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign Up
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
