import PropTypes from "prop-types";
import { createContext, useState } from "react";
import auth from "../../../firebase.config";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // social login
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                console.log(currentUser);
            } else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                setLoading(false);
                localStorage.removeItem("accessToken");
            }
        });
        return () => {
            return unsubscribe();
        };
    }, [axiosPublic]);

    const data = {
        createUser,
        loading,
        user,
        signInWithGoogle,
        setLoading,
        signOutUser,
        signInUser,
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
};
