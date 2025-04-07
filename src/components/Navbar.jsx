import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/logo.png'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md px-6 py-2 flex justify-between items-center sticky top-0 z-50">
      <Link to="/home" className="flex items-center gap-2">
        <img src={logo} alt="CCHive logo" className="h-15 w-15 object-contain" />
        <span className="font-bold text-xl text-primary">CCHive</span>
      </Link>
      <div className="flex items-center gap-6 text-sm md:text-base">
        {user ? (
          <>
            <span className="text-muted hidden sm:inline">
              Welcome, <span className="text-primary font-semibold">@{user.username}</span>
            </span>
            <Link to="/feed" className="hover:text-primary transition">Feed</Link>
            <Link to="/marketplace" className="hover:text-primary transition">Marketplace</Link>
            <Link to="/study_groups" className="hover:text-primary transition">Study Groups</Link>
            <Link to="/courses" className="hover:text-primary transition">Courses</Link>
            <Link to="/instructors" className="hover:text-primary transition">Instructors</Link>
            <Link to="/tutoring" className="hover:text-primary transition">Tutor</Link>
            <Link to="/tutoring/request" className="hover:text-primary transition">Get Tutored</Link>
            <button
              onClick={handleLogout}
              className="bg-accent text-white border px-3 py-1 rounded hover:bg-red-200 hover:text-red-700 hover:border-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-primary">Login</Link>
            <Link
              to="/register"
              className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-800 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
