import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const BASEURL = "http://localhost:8000/login/";
function loginApi({ formData }) {
  return axios.post(BASEURL, formData);
}

export function useLogin() {
  const navigate = useNavigate();

  const dataRef = useRef({
    id: "",
    accessToken: "",
    refreshToken: "",
    username: "",
    message: "",
  });

  const login = function (formData) {
    try {
      const data = loginApi(formData);
      dataRef.current.id = data.id;
      dataRef.current.accessToken = data.accessToken;
      dataRef.current.refreshToken = data.refreshToken;
      dataRef.current.username = data.username;
      navigate("/dashboard");
    } catch (err) {
      dataRef.current.message = JSON.stringify(err.response.data.error);
      console.log("ERROR", err);
    }
  };

  const logout = () => {
    // Clear the stored data when logging out
    dataRef.current = {
      id: null,
      accessToken: null,
      refreshToken: null,
      username: null,
      message: null,
    };
  };

  const getLoginData = () => {
    return dataRef.current;
  };

  return { login, logout, getLoginData };
}
