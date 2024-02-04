import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);
        const res = await register(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="photo">
            Choose Photo
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
          />
        </div>

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

        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Register
        </button>

        {isLoading && <Loader />}
      </form>

      <div className="py-3">
        <span className="text-gray-600">Already have an account? </span>
        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-700 font-bold"
        >
          Login
        </Link>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
