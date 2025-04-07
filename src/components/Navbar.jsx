import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Left - Logo */}
      <Link to="/home" className="text-2xl font-bold text-primary hover:opacity-80">
        📚 CCHive
      </Link>

      {/* Right - Links */}
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
