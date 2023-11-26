import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../components/home/Home";
import SignIn from "../components/auth/SignIn";
import Register from "../components/auth/Register";
import ErrorPage from "../components/shared/ErrorPage";
import Classes from "../components/classes/Classes";
import Trainers from "../components/trainer/Trainers";
import AddTrainer from "../components/trainer/AddTrainer";
import TrainerDetails from "../components/trainer/TrainerDetails";
import ClassDetails from "../components/classes/ClassDetails";
import TrainerBooking from "../components/trainer/TrainerBooking";
import Payment from "../components/payment/Payment";
import PrivateRoute from "../components/shared/PrivateRoute";
import Gallery from "../components/gallery/Gallery";

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
                path: "/classes-details/:id",
                element: <ClassDetails />,
            },
            {
                path: "/gallery",
                element: <Gallery />,
            },
            {
                path: "/trainers",
                element: <Trainers />,
            },
            {
                path: "/trainer/:id",
                element: <TrainerDetails />,
            },
            {
                path: "/trainer/:trainerId/:id",
                element: (
                    <PrivateRoute>
                        <TrainerBooking />
                    </PrivateRoute>
                ),
            },
            {
                path: "/trainer/:trainerId/:slotId/:packageId/payment",
                element: (
                    <PrivateRoute>
                        <Payment />
                    </PrivateRoute>
                ),
            },
            {
                path: "/add-trainer",
                element: (
                    <PrivateRoute>
                        <AddTrainer />
                    </PrivateRoute>
                ),
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
