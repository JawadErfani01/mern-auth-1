import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleUserInfo } from "./slices/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/profile")
      .then((res) => {
        dispatch(handleUserInfo(res.data.user));
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="my-2 container">
        <Outlet />
      </div>
    </>
  );
};

export default App;
