import { useDispatch, useSelector } from "react-redux";
import { setLoginData, clearLoginData, clearMessage, createMessage } from "./authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASEURL = "http://localhost:8000/login/";

function loginApi(formData) {
  return axios.post(BASEURL, formData);
}

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (formData) => {
    try {
      const response = await loginApi(formData);
      console.log(response.data);
      const { id, access_token: accessToken, refresh_token: refreshToken, username } = response.data;
      dispatch(setLoginData({ id, accessToken, refreshToken, username }));
      navigate("/dashboard");
    } catch (err) {
      const message = JSON.stringify(err.response.data.error);
      console.log(message);
      dispatch(setLoginData({ message }));
      console.log("ERROR", err);
      // You can dispatch an action to store the error message in Redux state if needed
    }
  };

  const logout = () => {
    dispatch(clearLoginData());
  };

  const closeMessage = () => {
    dispatch(clearMessage());
  };

  const setMessage = (message, messagetype = 0) => {
    dispatch(createMessage({ message, messagetype }));
  };
  return { login, logout, closeMessage, setMessage };
}
