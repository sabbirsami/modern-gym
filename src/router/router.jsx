import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../components/home/Home";
import SignIn from "../components/auth/SignIn";
import Register from "../components/auth/Register";
import ErrorPage from "../components/shared/ErrorPage";
import Classes from "../components/classes/Classes";
import Trainers from "../components/trainer/Trainers";
import AddTrainer from "../components/trainer/AddTrainer";

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
                path: "/classes",
                element: <Classes />,
            },
            {
                path: "/trainers",
                element: <Trainers />,
            },
            {
                path: "/add-trainer",
                element: <AddTrainer />,
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
