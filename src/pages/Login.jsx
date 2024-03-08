import axios from "axios";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { ErrorMessage, SuccessMessage } from "../ui/Message";
import { useAuth } from "../features/UserManage/useAuth";
import { store } from "../store";
import { useSelector } from "react-redux";
const BASEURL = "http://127.0.0.1:8000/login/";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, closeMessage } = useAuth();
  const message = useSelector((state) => state.message);
  useEffect(() => {}, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };
  const handleDismiss = () => {
    closeMessage();
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      {message && <ErrorMessage message={message} handleDismiss={handleDismiss} />}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className=" text-yellow-600 text-2xl font-bold text-center">Stock Portfolio Management Tool</h1>
        <h2 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="email"
                  autoComplete="email"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-600" />
                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-6">
                <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">
                Sign in
              </button>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link to="/register" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">
            Register one!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
