import { Link, useNavigate } from "react-router-dom";
import { Brain, User, LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("salvatoreUser");
  const user = savedUser ? JSON.parse(savedUser) : null;

  function handleLogout() {
    localStorage.removeItem("salvatoreUser");

    alert("You have been logged out.");

    navigate("/");
    window.location.reload();
  }

  // Decide dashboard according to user role
  const dashboardPath =
    user?.role === "student"
      ? "/student-dashboard"
      : user?.role === "counsellor"
      ? "/counsellor-dashboard"
      : user?.role === "district"
      ? "/district-dashboard"
      : "/dashboard";

  // Decide profile according to user role
  const profilePath =
    user?.role === "student"
      ? "/student-profile"
      : user?.role === "counsellor"
      ? "/counsellor-profile"
      : user?.role === "district"
      ? "/district-profile"
      : "/";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-icon">
          <Brain size={24} />
        </div>

        <span>Salvatore</span>
      </Link>

      <div className="nav-links">
        {!user ? (
          <>
            {/* NORMAL NAVBAR BEFORE LOGIN */}

            <Link to="/">Home</Link>
            <Link to="/checkin">Check-in</Link>
            <Link to="/history">My Journey</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/support">Support</Link>

            <Link to="/login" className="login-link">
              Login
            </Link>

            <Link to="/get-started" className="register-link">
              Get Started
            </Link>
          </>
        ) : (
          <>
            {/* PERSONAL NAVBAR AFTER LOGIN */}

            <Link to={dashboardPath}>Dashboard</Link>

            {user.role === "student" && (
              <>
                <Link to="/checkin">Check-in</Link>
                <Link to="/history">My Journey</Link>
                <Link to="/support">Support</Link>
              </>
            )}

            {user.role === "counsellor" && (
              <>
                <Link to="/messages">Messages</Link>
                <Link to="/support">Support</Link>
              </>
            )}

            {user.role === "district" && (
              <>
                <Link to="/support">Support</Link>
              </>
            )}

            <Link
              to={profilePath}
              className="login-link profile-nav-link"
            >
              <User size={17} />
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              <LogOut size={17} />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;