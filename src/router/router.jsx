import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../components/home/Home";
import SignIn from "../components/auth/SignIn";
import Register from "../components/auth/Register";
import ErrorPage from "../components/shared/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/sign-in",
                element: <SignIn />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);
export default router;
