import axios from "axios";

import { url } from "./data";

export const getUsers = async () => {
  try {
    const response = await axios.get(url + "/users");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const addUser = async (data) => {
  const response = await axios.post(`${url}/users`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};

export const updateUser = async (data) => {
  const response = await axios.put(`${url}/users`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};

export const deleteUser = async (data) => {
  const response = await axios.delete(`${url}/users${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
