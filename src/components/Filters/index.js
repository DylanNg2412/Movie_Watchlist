import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

  return (
    <Box
      className="filters"
      sx={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        marginBottom: "20px",
        maxWidth: "750px",
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
      />

      {/* filter by genre */}
      <FormControl sx={{ m: 1, flex: 1 }}>
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
      <FormControl sx={{ m: 1, flex: 1 }}>
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
