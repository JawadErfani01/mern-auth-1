import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleUserInfo } from "../slices/authSlice";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout"
      );
      if (response.data) {
        console.log(response.data);
        dispatch(handleUserInfo(null));
        navigate("/login");
      } else {
        console.log("there is no any data");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred.");
    }
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="flex items-center justify-between px-4 py-2">
        <Link to="/" className="text-xl font-bold">
          MERN Auth
        </Link>

        <ul className="flex gap-4">
          {userInfo ? (
            <>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white">
                  <span className="inline-block pr-2">{userInfo?.name}</span>
                  <FaSignInAlt />
                </Link>
              </li>

              <li>
                <button
                  onClick={logoutHandler}
                  className="text-gray-300 hover:text-white"
                >
                  Logout
                  <FaSignOutAlt className="ml-2" />
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  <FaSignInAlt /> Sign In
                </Link>
              </li>

              <li>
                <Link to="/register" className="text-gray-300 hover:text-white">
                  <FaSignOutAlt /> Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
