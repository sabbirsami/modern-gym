import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    if (loading) {
        return <Loading />;
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to={"/sign-in"}></Navigate>;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node,
};
