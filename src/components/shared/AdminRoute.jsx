import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Loading from "./Loading";
import useCheckRole from "../hooks/useCheckRole";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
    const { user, loading, signOutUser } = useContext(AuthContext);
    const { role, isUserLoading } = useCheckRole();

    if (loading || isUserLoading) {
        return <Loading />;
    }

    if (user && role === "admin") {
        console.log("true admin and users");
        return children;
    }
    // if (user && role !== "admin") {
    //     signOutUser();
    //     return (
    //         <Navigate
    //             state={{ comeFrom: location.pathname }}
    //             to={"/sign-in"}
    //         ></Navigate>
    //     );
    // }

    return (
        <Navigate state={{ comeFrom: location.pathname }} to={"/"}></Navigate>
    );
};

export default AdminRoute;
AdminRoute.propTypes = {
    children: PropTypes.node,
};
