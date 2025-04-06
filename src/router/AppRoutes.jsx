import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/login";
import Feed from "../pages/feed";
import Home from "../pages/home";


const AppRoutes = () => {
    const {user} = useAuth();

    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to="/feed"/> : <Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/feed"/>} />
            <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login"/> } />
        </Routes>
    );
};

export default AppRoutes;