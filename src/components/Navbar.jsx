import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/cchive2.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className={styles.header}>
      <div className={styles["logo-section"]}>
        <Link to="/home">
          <img src={logo} className={styles["logo-box"]} />
        </Link>
      </div>

      {user ? (
        <>
          <div className={styles["navigation"]}>
            <ul>
              <li>
                {" "}
                <span className="text-muted hidden sm:inline">
                  Welcome,{" "}
                  <span className="text-primary font-semibold">
                    {user.first_name + " " + user.last_name}
                  </span>
                </span>
              </li>
              |
              <li>
                <Link to="/home">HOME</Link>
              </li>
              |
              <li>
                <Link to="/study_groups">STUDY TOGETHER</Link>
              </li>
              |
              <li>
                <Link to="/marketplace">MARKETPLACE</Link>
              </li>
              |
              <li>
                <Link to="/peer-tutoring">PEER TUTORS</Link>
              </li>
              {/* |
              <li>
                <Link to="/courses">COURSES</Link>
              </li> */}
              |
              <li>
                <Link to="/reviews">REVIEWS</Link>
              </li>
              {/* |
              <li>
                <Link to="/instructors">INSTRUCTORS</Link>
              </li> */}
            </ul>
          </div>

          <button onClick={handleLogout} className={styles["login-button"]}>
            Logout
          </button>
        </>
      ) : (
        <div className="flex gap-3">
          <Link to="/login">
            <button className={styles["login-button"]}>LOGIN</button>
          </Link>
          <Link to="/register">
            <button className={styles["login-button"]}>SIGNUP</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
