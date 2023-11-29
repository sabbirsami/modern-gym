import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";
import Loading from "../shared/Loading";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const useCheckRole = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useContext(AuthContext);

    const { data: userData = [], isLoading: isUserLoading } = useQuery({
        queryKey: ["userData", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/role/${user?.email}`);
            return res.data;
        },
    });
    if (isUserLoading || loading) {
        return <Loading />;
    }
    const role = userData[0]?.role;

    return role;
};

export default useCheckRole;
