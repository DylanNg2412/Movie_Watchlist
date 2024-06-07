import axios from "axios";

export const getMovieDetails = async (id) => {
  const res = await axios.get(`${url}/movies/${id}`);
  return res.data;
};
