import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../dashboard/index";
import LoadingScreen from "../components/LoadingScreen";
const DEFAULT_PATH = "/create"

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "create", element: <CreateUser /> },
        { path: "users", element: <AllUser /> },
      ],
    },
  ]);
}

const CreateUser = Loadable(lazy(() => import("../dashboard/CreateUser")));
const AllUser = Loadable(lazy(() => import("../dashboard/AllUsers")));
