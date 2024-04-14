import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { handleUserInfo } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(handleUserInfo({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
