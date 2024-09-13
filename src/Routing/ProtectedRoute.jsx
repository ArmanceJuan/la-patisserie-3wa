import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  console.log(useSelector((state) => state));

  // // const { isAuthenticated } = useSelector((state) => state.auth);
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }
  return element;
};

export default ProtectedRoute;
