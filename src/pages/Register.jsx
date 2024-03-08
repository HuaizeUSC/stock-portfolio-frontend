import axios from "axios";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { ErrorMessage, SuccessMessage } from "../ui/Message";

const BASEURL = "http://127.0.0.1:8000/register/";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const [invitationCode, setInvitationCode] = useState("");

  const [isRegistered, setIsRegistered] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (invitationCode !== "spmt666") {
      setMessage("Registration failed: Wrong invitation code!"); // Log error
      // Handle error, maybe display error message to user
      setIsRegistered(3);
      return;
    }

    try {
      const response = await axios.post(BASEURL, formData); // Assuming your backend API endpoint is /api/registerUser // Log response data
      // Handle success, maybe redirect user to login page
      setIsRegistered(2);
      setMessage("Registration successful! Now you can login with your account");

      navigate("/login");
    } catch (error) {
      setMessage(`Registration failed: ${JSON.stringify(error.response.data.error)}`); // Log error
      // Handle error, maybe display error message to user
      setIsRegistered(3);
    }
  };

  const handleDismiss = () => {
    setIsRegistered(1);
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      {isRegistered == 2 && <SuccessMessage message={message} handleDismiss={handleDismiss} />}
      {isRegistered == 3 && <ErrorMessage message={message} handleDismiss={handleDismiss} />}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className=" text-yellow-600 text-2xl font-bold text-center">Stock Portfolio Management Tool</h1>
        <h2 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">Register your account</h2>
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
                  id="email"
                  name="username"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
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
                  id="password1"
                  name="password1"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password1}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Comfirm your password
              </label>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  value={formData.password2}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="invitation-code" className="block text-sm font-medium leading-6 text-gray-900">
                Invitation Code
              </label>
              <div className="mt-2">
                <input
                  id="invitation-code"
                  name="invitationCode"
                  type="text"
                  value={invitationCode}
                  onChange={(e) => {
                    setInvitationCode(e.target.value);
                  }}
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mt-12 flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">
            Login!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
