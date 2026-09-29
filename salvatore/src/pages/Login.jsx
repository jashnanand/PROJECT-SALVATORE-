import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const savedUser = localStorage.getItem("salvatoreUser");

    if (!savedUser) {
      alert("No account found. Please register first.");
      navigate("/get-started");
      return;
    }

    const user = JSON.parse(savedUser);

    if (email !== user.email || password !== user.password) {
      alert("Incorrect email or password.");
      return;
    }

    alert(`Welcome back, ${user.name}!`);
if (user.role === "student") {
  navigate("/student-dashboard");
} else if (user.role === "counsellor") {
  navigate("/counsellor-dashboard");
} else if (user.role === "district") {
  navigate("/district-dashboard");
}
  }
  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-card">
          <h1>Welcome back 👋</h1>

          <p>Login to continue your Salvatore journey.</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/get-started">Get Started</Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Login;