// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import EditIcon from "@mui/icons-material/Edit";
// import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
// import AddIcon from "@mui/icons-material/Add";
// import { useEffect, useState } from "react";
// import { fetchMovieDetails, updateWatchlistStatus } from "./api";

export default function MovieDetails() {
  //   const { id } = useParams();
  //   const navigate = useNavigate();
  //   const [movie, setMovie] = useState(null);
  //   const [watchList, setWatchList] = useState(false);
  //   useEffect(() => {
  //     const getMovieDetails = async () => {
  //       const data = await fetchMovieDetails(id);
  //       setMovie(data);
  //       setWatchList(data.watchlist);
  //     };
  //     getMovieDetails();
  //   }, [id]);
  //   const AddToWatchList = async () => {
  //     const newWatchlistStatus = !watchList;
  //     await updateWatchlistStatus(id, newWatchlistStatus);
  //     setWatchList(newWatchlistStatus);
  //   };
  //   if (!movie) {
  //     return <Typography>Loading...</Typography>;
  //   }
  //   return (
  //     <Container
  //       id="movie-details-container"
  //       className="movieDetailsContainer"
  //       style={{ marginTop: "40px" }}
  //     >
  //       <Grid container className="movieDetails">
  //         <img src={movie.image} className="movieImage" alt="Movie Poster" />
  //         <Box className="movieDetailsBox">
  //           <Grid
  //             sx={{
  //               "@media (min-width: 900px)": {
  //                 padding: "20px",
  //               },
  //             }}
  //           >
  //             <Typography
  //               variant="h4"
  //               style={{
  //                 margin: "5px 0",
  //               }}
  //               sx={{
  //                 "@media (min-width: 321px)": {
  //                   fontWeight: "bolder",
  //                 },
  //               }}
  //             >
  //               {movie.title}
  //             </Typography>
  //             <Typography
  //               variant="h6"
  //               style={{
  //                 margin: "5px 0",
  //               }}
  //             >
  //               Release Date : {movie.release_date}
  //             </Typography>
  //             <Typography
  //               variant="h6"
  //               style={{
  //                 margin: "5px 0",
  //               }}
  //             >
  //               Country : {movie.country}
  //             </Typography>
  //             <Typography
  //               variant="h6"
  //               style={{
  //                 margin: "5px 0",
  //               }}
  //             >
  //               Genre : {movie.genres.map((genre) => genre.name).join(", ")}
  //             </Typography>
  //             <Typography
  //               variant="h6"
  //               style={{
  //                 margin: "5px 0",
  //               }}
  //             >
  //               Director : {movie.director}
  //             </Typography>
  //             <Typography
  //               variant="h6"
  //               style={{
  //                 margin: "5px 0",
  //               }}
  //             >
  //               Cast : {movie.cast.join(", ")}
  //             </Typography>
  //             <Typography
  //               variant="h6"
  //               style={{
  //                 margin: "5px 0 20px 0",
  //               }}
  //             >
  //               {movie.description}
  //             </Typography>
  //             <Box style={{ display: "flex", justifyContent: "end" }}>
  //               <Button
  //                 variant="contained"
  //                 style={
  //                   watchList
  //                     ? {
  //                         backgroundColor: "white",
  //                         color: "black",
  //                         marginBottom: "50px",
  //                       }
  //                     : { backgroundColor: "black", marginBottom: "50px" }
  //                 }
  //                 startIcon={watchList ? <DoNotDisturbIcon /> : <AddIcon />}
  //                 onClick={AddToWatchList}
  //               >
  //                 {watchList
  //                   ? "Remove movie from WatchList "
  //                   : "Add to WatchList"}
  //               </Button>
  //             </Box>
  //           </Grid>
  //         </Box>
  //         <IconButton
  //           onClick={() => navigate("/")}
  //           edge="end"
  //           style={{
  //             position: "absolute",
  //             top: 0,
  //             left: 0,
  //             color: "white",
  //             backgroundColor: "black",
  //           }}
  //         >
  //           <ArrowBackIosNewIcon />
  //         </IconButton>
  //         <Grid style={{ position: "absolute", bottom: 0, right: 0 }}>
  //           <IconButton
  //             component={Link}
  //             to={`/editPopularMovie/${movie.id}`}
  //             edge="end"
  //             style={{
  //               color: "blue",
  //               backgroundColor: "white",
  //               marginRight: "10px",
  //             }}
  //           >
  //             <EditIcon style={{ width: "37px", height: "37px" }} />
  //           </IconButton>
  //         </Grid>
  //       </Grid>
  //     </Container>
  //   );
}
