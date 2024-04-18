import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        return <Outlet />
    }

    return <Navigate to="/login" replace />
}

export default PrivateRoutes;