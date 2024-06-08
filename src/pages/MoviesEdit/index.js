import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import Header from "../../components/Header";
import {
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import { getMovie, updateMovie } from "../../utils/api_movies";
import { uploadImage } from "../../utils/api_images";
import { useCookies } from "react-cookie";
import { getGenres } from "../../utils/api_genres";

export default function MoviesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [release_date, setRelease_date] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // get data from movie api: /movies/:id
  const {
    data: movie,
    error: movieError,
    isLoading,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
  });

  const { data: genresData = [], error: genresError } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });

  useEffect(() => {
    setGenres(genresData);
  }, [genresData]);

  // when data is fetched from API, set the states for all the fields with its current value
  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setCountry(movie.country);
      setSelectedGenres(movie.genres);
      setRelease_date(movie.release_date);
      setDirector(movie.director);
      setCast(movie.cast);
      setDescription(movie.description);
      setImage(movie.image ? movie.image : "");
    }
  }, [movie]);

  const updateMovieMutation = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      enqueueSnackbar("Movie has been updated", {
        variant: "success",
      });
      // redirect back to home page
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response?.data?.message || "Error updating movie", {
        variant: "error",
      });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const genreNames = selectedGenres.map((genre) => genre._id);
    // to trigger the mutation to call the API
    updateMovieMutation.mutate({
      id: id,
      title: title,
      country: country,
      genres: genreNames,
      release_date: release_date,
      director: director,
      cast: cast,
      description: description,
      image: image,
      token: token,
    });
  };

  // upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setImage(data.image_url);
    },
    onError: (error) => {
      enqueueSnackbar(
        error.response?.data?.message || "Error uploading image",
        {
          variant: "error",
        }
      );
    },
  });

  const handleImageUpload = (event) => {
    uploadImageMutation.mutate(event.target.files[0]);
  };

  // if API data haven't returned yet
  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  // if there is an error in API call
  if (movieError || genresError) {
    return (
      <Container>
        {movieError?.response?.data?.message ||
          genresError?.response?.data?.message}
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                margin: "20px 0",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Edit Movie
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Country"
                  variant="outlined"
                  fullWidth
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={genresData}
                  getOptionLabel={(option) => option.name}
                  value={selectedGenres}
                  onChange={(event, newValue) => {
                    setSelectedGenres(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Genre"
                      placeholder="Select genres"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(0, 0, 0, 0.23",
                          },
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Released Date"
                  variant="outlined"
                  fullWidth
                  value={release_date}
                  onChange={(e) => setRelease_date(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Director"
                  variant="outlined"
                  fullWidth
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Cast"
                  variant="outlined"
                  fullWidth
                  value={cast}
                  onChange={(e) => setCast(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={5}
                  variant="outlined"
                  label="Description"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                {image !== "" ? (
                  <>
                    <div>
                      <img
                        src={"http://localhost:5000/" + image}
                        width="300px"
                        height="300px"
                      />
                    </div>
                    <Button onClick={() => setImage("")}>Remove Image</Button>
                  </>
                ) : (
                  <input
                    type="file"
                    multiple={false}
                    onChange={handleImageUpload}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  onClick={handleFormSubmit}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
