import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Link,
} from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import MovieIcon from "@mui/icons-material/Movie";

import { useCookies } from "react-cookie";

export default function Dashboard() {
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;

  const navigate = useNavigate();
  return (
    <>
      {currentUser && currentUser.role ? (
        <>
          <Header />
          <Container maxWidth="md" sx={{ my: 5, color: "white" }}>
            <Typography variant="h3" align="center" gutterBottom>
              Dashboard
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <MovieIcon sx={{ fontSize: "3rem", mb: 1 }} />
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      Manage Movies
                    </Typography>
                    <Button
                      onClick={() => {
                        navigate("/manage-movies");
                      }}
                      sx={{
                        color: "black",
                        backgroundColor: "#f5c518",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    >
                      Access
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <EditIcon sx={{ fontSize: "3rem", mb: 1 }} />
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      Manage Genres
                    </Typography>
                    <Button
                      onClick={() => {
                        navigate("/genres");
                      }}
                      sx={{
                        color: "black",
                        backgroundColor: "#f5c518",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    >
                      Access
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} sx={{ margin: "0 auto" }}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <GroupsIcon sx={{ fontSize: "3rem", mb: 1 }} />
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      Manage Users
                    </Typography>
                    <Button
                      onClick={() => {
                        navigate("/manage-users");
                      }}
                      sx={{
                        color: "black",
                        backgroundColor: "#f5c518",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    >
                      Access
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
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
                <ArrowBackIcon sx={{ mr: 1 }} /> Back
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
