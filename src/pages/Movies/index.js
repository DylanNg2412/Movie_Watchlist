import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Container,
} from "@mui/material";

import Header from "../../components/Header";
import { getMovies } from "../../utils/api_movies";
import { getGenres } from "../../utils/api_genres";
import MovieCard from "../../components/MovieCard";
import Filters from "../../components/Filters";

export default function Movies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("");

  /* Load data */

  // load the movies
  const {
    data: movies = [],
    // isLoading,
    // isError,
  } = useQuery({
    queryKey: ["movies", search, genre, sort],
    queryFn: () => getMovies(search, genre, sort), // pass in the genre to filter out the product
  });

  // load the genres
  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });

  /* Load data - end */

  /*Handle changes */

  // handle for search
  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };

  const handleGenreChange = (newGenre) => {
    setGenre(newGenre);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  /*Handle changes - end */

  //   if (isLoading) {
  //     return <h2>Loading...</h2>;
  //   }

  //   if (isError) {
  //     return <h2>No movies found.</h2>;
  //   }
  return (
    <>
      <Header />
      <Container sx={{ paddingTop: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Filters
            search={search}
            genre={genre}
            genres={genres}
            sort={sort}
            onGenreChange={handleGenreChange}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
          />
        </Box>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Movies
        </Typography>
        <Grid item container spacing={2} sx={{ paddingTop: "20px" }}>
          {movies
            ? movies.map((movie) => (
                <Grid key={movie._id} item lg={4} md={6} xs={12}>
                  <MovieCard movie={movie} />
                </Grid>
              ))
            : null}
          {movies && movies.length === 0 ? (
            <Grid item xs={12}>
              <Typography align="center" sx={{ padding: "10px 0" }}>
                No movies found.
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </>
  );
}