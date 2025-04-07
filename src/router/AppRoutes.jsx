import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Feed from "../pages/Feed";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Marketplace from "../pages/Marketplace";
import CourseDetail from '../pages/CourseDetail';
import InstructorDetail from '../pages/InstructorDetail';
import Courses from '../pages/Courses';
import Instructors from '../pages/Instructors';

const AppRoutes = () => {
    const {user} = useAuth();

    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={user ? <Navigate to="/feed"/> : <Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/feed"/>} />
            <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login"/> } />
            <Route path="/register" element={<Register />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/instructors/:id" element={<InstructorDetail />} />
        </Routes>
    );
};

export default AppRoutes;