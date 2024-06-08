import axios from "axios";

import { url } from "./data";

export const getMovieDetails = async () => {
  try {
    const response = await axios.get(
      `${url}/movie-details?${query.toString()}`
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
  return res.data;
};

export const getMovieDetail = async (id) => {
  const res = await axios.get(`${url}/movie-details/${id}`);
  return res.data;
};
