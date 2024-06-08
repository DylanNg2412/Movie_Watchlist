import React from "react";

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

  console.log(props);

  return (
    <div className="filters">
      {/* search by keywords */}
      <input
        placeholder="Search keywords.."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* <FormControl
        sx={{
          marginTop: "10px",
          width: "200px",
          marginLeft: "10px",
          marginBottom: "20px",
        }}
      >
        <InputLabel id="product-select-label">Genre</InputLabel>
        <Select
          labelId="product-select-label"
          id="product-select"
          label="Genre"
          value={genre}
          onChange={(event) => {
            onGenreChange(event.target.value);
          }}
        >
          <MenuItem value="all">Default</MenuItem>
          {genres.map((g) => {
            return (
              <MenuItem key={g._id} value={g._id}>
                {g.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl> */}

      {/* filter by genre */}
      <select onChange={(e) => onGenreChange(e.target.value)} value={genre}>
        <option value={"all"}>Default</option>
        {genres.map((g) => {
          return (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          );
        })}
      </select>

      {/* sort by released date or country using selector */}
      <select onChange={(e) => onSortChange(e.target.value)} value={sort}>
        <option value={""}>Default</option>
        <option value={"country"}>Country</option>
        <option value={"release_date"}>Year</option>
      </select>
    </div>
  );
}

export default Filters;
