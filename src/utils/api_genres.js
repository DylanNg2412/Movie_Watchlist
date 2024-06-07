import axios from "axios";

import { url } from "./data";

export const getGenres = async () => {
  try {
    const response = await axios.get(url + "/genres");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const addGenre = async (data) => {
  const response = await axios.post(
    `${url}/genres`, // url of the POST API
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

export const updateGenre = async (data) => {
  const response = await axios.put(
    `${url}/genres/${data._id}`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return response.data;
};

export const deleteGenre = async (data) => {
  const response = await axios.delete(`${url}/genres/${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
