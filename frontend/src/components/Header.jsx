// // import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
// import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// import { LinkContainer } from "react-router-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { logout } from "../slices/authSlice";
// import { useCookies } from "react-cookie";
// const Header = () => {
//   const { userInfo } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [logoutApiCall] = useLogoutMutation();

//   const [, removeCookie] = useCookies(["jwt"]);

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       removeCookie("jwt"); // Use the removeCookie function directly
//       dispatch(logout());
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
//         <Container>
//           <LinkContainer to="/">
//             <Navbar.Brand>MERN Auth</Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               {userInfo ? (
//                 <>
//                   <NavDropdown title={userInfo.name} id="username">
//                     <LinkContainer to="/profile">
//                       <NavDropdown.Item>Profile</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item onClick={logoutHandler}>
//                       Logout
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </>
//               ) : (
//                 <>
//                   <LinkContainer to="/login">
//                     <Nav.Link>
//                       <FaSignInAlt /> Sign In
//                     </Nav.Link>
//                   </LinkContainer>
//                   <LinkContainer to="/register">
//                     <Nav.Link>
//                       <FaSignOutAlt /> Sign Up
//                     </Nav.Link>
//                   </LinkContainer>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useCookies } from "react-cookie";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const [, removeCookie] = useCookies(["jwt"]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      removeCookie("jwt"); // Use the removeCookie function directly
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
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
                  <span className="inline-block pr-2">{userInfo.name}</span>
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
