import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";

function Filters(props) {
  const {
    search,
    genre,
    genres,
    sort,
    onSearchChange,
    onGenreChange,
    onSortChange,
  } = props;

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      className="filters"
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: "10px",
        alignItems: isMobile ? "stretch" : "center",
        marginBottom: "20px",
        maxWidth: "750px",
        width: "100%",
      }}
    >
      {/* search by keywords */}
      <TextField
        sx={{
          flex: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
        }}
        variant="outlined"
        placeholder="Search keywords.."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth={isMobile}
      />

      {/* filter by genre */}
      <FormControl
        sx={{
          flex: 1,
          width: isMobile ? "100%" : "auto",
          mt: isMobile ? 1 : 0,
        }}
      >
        <Select
          value={genre}
          onChange={(e) => onGenreChange(e.target.value)}
          sx={{ backgroundColor: "white", width: "100%" }}
        >
          <MenuItem value="all">All</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g._id} value={g.name}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* sort by released date or country */}
      <FormControl
        sx={{
          flex: 1,
          width: isMobile ? "100%" : "auto",
          mt: isMobile ? 1 : 0,
        }}
      >
        <Select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          sx={{ backgroundColor: "white", width: "100%" }}
        >
          <MenuItem value="default">Sort</MenuItem>
          <MenuItem value="country">Country</MenuItem>
          <MenuItem value="release_date">Year</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Filters;
