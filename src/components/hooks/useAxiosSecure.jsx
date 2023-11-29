import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000/api",
});
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem("accessToken");
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async (err) => {
            const status = err.response.status;
            if (status === 401 || status === 403) {
                await signOutUser();
                navigate("/sign-in");
            }
            return Promise.reject(err);
        }
    );
    return axiosSecure;
};

export default useAxiosSecure;
