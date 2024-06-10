import axios from "axios";

import { url } from "./data";

export const getWatchlists = async (token) => {
  const res = await axios.get(`${url}/watchlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getWatchlist = async (id, token) => {
  const res = await axios.get(`${url}/watchlist/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res.data;
};

// Function to add a movie to the watchlist
export const addToWatchlist = async (data) => {
  const response = await axios.post(`${url}/watchlist`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};

export const updateWatchlist = async (data) => {
  const response = await axios.put(
    `${url}/watchlist/${data._id}`,
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

export const removeFromWatchlist = async (data) => {
  const response = await axios.delete(`${url}/watchlist/${data._id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
