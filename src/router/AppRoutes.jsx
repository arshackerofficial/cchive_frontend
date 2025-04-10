import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Feed from "../pages/Feed";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Marketplace from "../pages/Marketplace";
import CourseDetail from "../pages/CourseDetail";
import InstructorDetail from "../pages/InstructorDetail";
import Courses from "../pages/Courses";
import Instructors from "../pages/Instructors";
import TutorProfileSetup from "../pages/TutorProfileSetup";
import RequestTutor from "../pages/RequestTutor";
import StudyGroups from "../pages/StudyGroups";
import StudyGroupChat from "../pages/StudyGroupChat";
import PrivateRoute from "../components/PrivateRoute";
import UserProfile from "../pages/UserProfile";
import ReviewsPage from "../pages/ReviewsPage";
import PeerTutoring from "../pages/PeerTutoring";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/home" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/home" />}
      />

      <Route
        path="/feed"
        element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        }
      />
      <Route
        path="/marketplace"
        element={
          <PrivateRoute>
            <Marketplace />
          </PrivateRoute>
        }
      />
      <Route
        path="/reviews"
        element={
          <PrivateRoute>
            <ReviewsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <PrivateRoute>
            <Courses />
          </PrivateRoute>
        }
      />
      <Route
        path="/instructors"
        element={
          <PrivateRoute>
            <Instructors />
          </PrivateRoute>
        }
      />
      <Route
        path="/courses/:id"
        element={
          <PrivateRoute>
            <CourseDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/instructors/:id"
        element={
          <PrivateRoute>
            <InstructorDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/peer-tutoring"
        element={
          <PrivateRoute>
            <PeerTutoring />
          </PrivateRoute>
        }
      />
      <Route
        path="/tutoring"
        element={
          <PrivateRoute>
            <TutorProfileSetup />
          </PrivateRoute>
        }
      />
      <Route
        path="/tutoring/request"
        element={
          <PrivateRoute>
            <RequestTutor />
          </PrivateRoute>
        }
      />
      <Route
        path="/study_groups"
        element={
          <PrivateRoute>
            <StudyGroups />
          </PrivateRoute>
        }
      />
      <Route
        path="/study_groups/:id"
        element={
          <PrivateRoute>
            <StudyGroupChat />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/:username"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
