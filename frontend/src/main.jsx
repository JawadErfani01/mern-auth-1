import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </QueryClientProvider>
  </Provider>
);
