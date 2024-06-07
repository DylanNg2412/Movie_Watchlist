import axios from "axios";
import { url } from "./data";

export const getMovies = async (search, genres, sort) => {
  try {
    let params = {};
    if (search !== "") {
      params.search = search;
    }
    if (genres !== "all") {
      params.genres = genres;
    }
    if (sort !== "") {
      params.sort = sort;
    }
    const query = new URLSearchParams(params);

    const response = await axios.get(`${url}/movies?${query.toString()}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getMovie = async (id) => {
  const res = await axios.get(`${url}/movies/${id}`);
  return res.data;
};

export const addMovies = async (data) => {
  const response = await axios.post(
    `${url}/movies`, // url of the POST API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
        Authorization: "Bearer " + data.token, // include token in the API
      },
    }
  );
  return response.data;
};

export const updateMovie = async (data) => {
  const response = await axios.put(
    `${url}/movies/${data.id}`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json", // do this if have data
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return response.data;
};

export const deleteMovie = async (data) => {
  const response = await axios.delete(`${url}/movies/${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
