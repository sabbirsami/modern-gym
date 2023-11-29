import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";

import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Loading from "../shared/Loading";

const useCheckRole = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useContext(AuthContext);

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/role/${user?.email}`);
            return res?.data;
        },
    });
    if (isUserLoading) {
        return <Loading />;
    }

    const role = userData[0]?.role;
    console.log(userData, role);

    return { role, isUserLoading };
};

export default useCheckRole;
