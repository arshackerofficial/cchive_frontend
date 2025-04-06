import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return(
        <nav className="p-7 flex gap-10">
            <Link to='/home' >📚 CCHive</Link>
            <div className="flex gap-5">
                {user ? (
                    <>
                        <span className="pr-5 ">Welcome, {user.first_name}</span>
                        <Link to='/feed'>Feed</Link>
                        <Link to='/home'>Home</Link>
                        <Link to='/marketplace'>Marketplace</Link>
                        <Link to='/study_groups'>Study Groups</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) 
                :
                (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar