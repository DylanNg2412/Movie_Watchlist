import axios from "axios";

import { url } from "./data";

export const getUsers = async () => {
  try {
    const response = await axios.get(url + "/user");
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const addUser = async (data) => {
  const response = await axios.post(`${url}/user`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};

// update role only
export const updateUser = async (data) => {
  const response = await axios.put(
    `${url}/user/${data._id}`,
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

export const deleteUser = async (data) => {
  const response = await axios.delete(`${url}/user${data._id}`, {
    headers: {
      Authorization: "Bearer " + data.token,
    },
  });
  return response.data;
};
