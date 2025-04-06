import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Feed from "../pages/Feed";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Marketplace from "../pages/Marketplace";

const AppRoutes = () => {
    const {user} = useAuth();

    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/" element={user ? <Navigate to="/feed"/> : <Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/feed"/>} />
            <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login"/> } />
        </Routes>
    );
};

export default AppRoutes;