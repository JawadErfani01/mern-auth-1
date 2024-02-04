import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.myEmail);
  }, [userInfo.myEmail, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>

      <form onSubmit={submitHandler}>
        <div className="my-2">
          <label htmlFor="name" className="block font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="my-2">
          <label htmlFor="email" className="block font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="my-2">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>
        <div className="my-2">
          <label htmlFor="confirmPassword" className="block font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-3"
        >
          Update
        </button>

        {isLoading && <Loader />}
      </form>
    </FormContainer>
  );
};

export default ProfileScreen;
