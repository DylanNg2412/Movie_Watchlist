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
import EditIcon from "@mui/icons-material/Edit";
import MovieIcon from "@mui/icons-material/Movie";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <div>
                  <MovieIcon sx={{ fontSize: "3rem", mb: 1 }} />
                </div>
                <Typography variant="h5" component="div">
                  Manage Movies
                </Typography>
                <Button
                  onClick={() => {
                    navigate("/manage-movies");
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 3 }}
                >
                  Access
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <div>
                  <EditIcon sx={{ fontSize: "3rem", mb: 1 }} />
                </div>
                <Typography variant="h5" component="div">
                  Manage Genres
                </Typography>
                <Button
                  onClick={() => {
                    navigate("/genres");
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 3 }}
                >
                  Access
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={12} sm={6} xsoffset={3}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <div>
                  <EditIcon sx={{ fontSize: "3rem", mb: 1 }} />
                </div>
                <Typography variant="h5" component="div">
                  Manage Users
                </Typography>
                <Button
                  onClick={() => {
                    navigate("/manage-users");
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 3 }}
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
  );
}
