import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Login from "./Login";
import Contact from "../Routing/Contact";
import Play from "./Play";
import Admin from "../Routing/Admin";
import ProtectedRoute from "./ProtectedRoute"; // Importe le composant ProtectedRoute

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/play",
        element: <Play />,
      },
      {
        path: "/admin",
        element: <ProtectedRoute element={<Admin />} />, // Protéger la route admin
      },
    ],
  },
]);

export default router;
