import axios from "axios";
import React from "react";
export const getLessons = async () => {
  const response = await axios.get("http://localhost:5000/api/lessons");
  return response.data;
};
