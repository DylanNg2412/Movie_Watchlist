import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Chip,
  Box,
} from "@mui/material";
import { addMovies } from "../../utils/api_movies";
import { getGenres } from "../../utils/api_genres";
import { uploadImage } from "../../utils/api_images";
import { useCookies } from "react-cookie";

export default function MoviesAddNew() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const { currentUser = {} } = cookies;
  const { token } = currentUser;
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [image, setImage] = useState("");

  const [release_date, setRelease_date] = useState(null);

  const { data: genresData = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });

  useState(() => {
    setGenres(genresData);
  }, [genresData]);

  // setup mutation for add new product
  const addNewMutation = useMutation({
    mutationFn: addMovies,
    onSuccess: () => {
      // if API called successful, do what ?
      navigate("/");
    },
    onError: (error) => {
      // if API is called but error, do what ?
      alert(error.response.data.message);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const genreNames = selectedGenres.map((genre) => genre._id);
    // to trigger the mutation to call the API
    addNewMutation.mutate({
      title: title,
      country: country,
      genres: genreNames,
      release_date: release_date,
      director: director,
      cast: cast,
      image: image,
      token: token,
    });
  };

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
              Add New Movie
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
                {/* <FormControl
                  sx={{ marginTop: "10px", width: "200px", marginLeft: "10px" }}
                >
                  <InputLabel id="product-select-label">Category</InputLabel>
                  <Select
                    labelId="product-select-label"
                    id="product-select"
                    label="Category"
                    value={category}
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  >
                    {categories.map((category) => {
                      return (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl> */}
                {/* <FormControl fullWidth>
                  <InputLabel id="product-select">Genre</InputLabel>
                  <Select
                    labelId="product-select-label"
                    id="product-select"
                    label="Genre"
                    variant="outlined"
                    multiple
                    value={selectedGenres}
                    onChange={(event) => {
                      setSelectedGenres(event.target.value);
                    }}
                  >
                    {genres.map((genre) => (
                      <MenuItem key={genre._id} value={genre._id}>
                        {genre.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <Box sx={{ width: "100%" }}>
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
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Released Date"
                  variant="outlined"
                  fullWidth
                  value={release_date || ""}
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
