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
import Dashboard from "../components/dashboard/Dashboard";
import ManageNewsletter from "../components/dashboard/manageNewsletter/ManageNewsletter";
import AllTrainers from "../components/dashboard/allTrainers/AllTrainers";
import TrainerPayment from "../components/dashboard/allTrainers/TrainerPayment";
import AllAppliances from "../components/dashboard/AllAppliances";
import Community from "../components/posts/Community";
import AddNewForum from "../components/dashboard/addNewForum/AddNewForum";
import ManageSlot from "../components/dashboard/manageSlot/ManageSlot";
import ManageMembers from "../components/dashboard/manageMembers/ManageMembers";
import AddClass from "../components/dashboard/addClass/AddClass";
import ActivityLog from "../components/dashboard/activityLog/ActivityLog";
import UserProfileSetting from "../components/dashboard/userProfileSetting/UserProfileSetting";
import RecommendedClasses from "../components/dashboard/recommendedClasses/RecommendedClasses";
import Balance from "../components/dashboard/balance/Balance";

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
                path: "/community",
                element: <Community />,
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
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard/manage-newsletter",
                element: (
                    <PrivateRoute>
                        <ManageNewsletter />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/all-trainer",
                element: (
                    <PrivateRoute>
                        <AllTrainers />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/all-appliances",
                element: (
                    <PrivateRoute>
                        <AllAppliances />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/add-new-forum",
                element: (
                    <PrivateRoute>
                        <AddNewForum />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/manage-slot",
                element: (
                    <PrivateRoute>
                        <ManageSlot />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/manage-members",
                element: (
                    <PrivateRoute>
                        {" "}
                        <ManageMembers />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/activity-log",
                element: (
                    <PrivateRoute>
                        <ActivityLog />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/add-class",
                element: (
                    <PrivateRoute>
                        <AddClass />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/profile-setting",
                element: (
                    <PrivateRoute>
                        <UserProfileSetting />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/recommended-classes",
                element: (
                    <PrivateRoute>
                        <RecommendedClasses />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/balance",
                element: (
                    <PrivateRoute>
                        <Balance />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard/all-trainer/:trainerId/payment",
                element: (
                    <PrivateRoute>
                        <TrainerPayment />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);
export default router;
