import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return <Outlet />
    }

    return <Navigate to="/" replace />
};

export default GuestRoutes;