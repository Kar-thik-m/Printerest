import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const {  isAuthenticated} = useSelector(state => state.user);

  

    if (!isAuthenticated) {
        return "no"
    }
  navigator
   
};

export default ProtectedRoute;