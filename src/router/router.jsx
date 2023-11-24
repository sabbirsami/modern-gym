import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../components/home/Home";
import SignIn from "../components/auth/SignIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/sign-in",
                element: <SignIn />,
            },
        ],
    },
]);
export default router;
