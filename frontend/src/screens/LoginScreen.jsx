import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = (credentials) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [, setCookie] = useCookies(["jwt"]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log(data);
      if (data) {
        // Set token in cookie
        console.log("it is the data  ", data);
        const userInfo = {
          name: data.name,
          myEmail: data.email,
          id: data._id,
        };
        console.log(userInfo);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        // setCookie("jwt", data.token);

        // Navigate to home page
        navigate("/");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [navigate, userInfo]);

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          // disabled={isLoading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Sign In
        </button>
      </form>

      {/* {isLoading && <Loader />} */}

      <div className="py-3">
        <span className="text-gray-600">New Customer? </span>
        <Link
          to="/register"
          className="text-blue-500 hover:text-blue-700 font-bold"
        >
          Register
        </Link>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
