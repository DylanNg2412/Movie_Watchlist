import axios from "axios";

import { url } from "./data";

export const getUserLogin = async (data) => {
  const response = await axios.post(`${url}/user/login`, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getUserSignUp = async (data) => {
  const response = await axios.post(
    `${url}/user/signup`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
