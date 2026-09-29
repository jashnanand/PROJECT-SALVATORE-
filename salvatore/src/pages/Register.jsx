import { useState } from "react";
import {
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedRole = searchParams.get("role");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState(
    selectedRole === "counsellor"
      ? "counsellor"
      : selectedRole === "district"
      ? "district"
      : "student"
  );

  function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all the fields.");
      return;
    }

    const user = {
      name,
      email,
      password,
      role,
    };

    localStorage.setItem(
      "salvatoreUser",
      JSON.stringify(user)
    );

    alert("Registration successful!");

    if (role === "student") {
      navigate("/student-dashboard");
    } else if (role === "counsellor") {
      navigate("/counsellor-dashboard");
    } else if (role === "district") {
      navigate("/district-dashboard");
    }
  }

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-card">

          <h1>Create your account ✨</h1>

          <p>
            Join Salvatore and access the appropriate
            monitoring and support system.
          </p>

          <form onSubmit={handleRegister}>

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>I am a:</label>

            <div className="role-selection">

              {/* STUDENT */}
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={(e) => setRole(e.target.value)}
                />

                🎓 Student
              </label>

              {/* COUNSELLOR */}
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="counsellor"
                  checked={role === "counsellor"}
                  onChange={(e) => setRole(e.target.value)}
                />

                👩‍⚕️ Counsellor
              </label>

              {/* DISTRICT OFFICER */}
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="district"
                  checked={role === "district"}
                  onChange={(e) => setRole(e.target.value)}
                />

                🏛️ District Officer
              </label>

            </div>

            <button
              type="submit"
              className="auth-button"
            >
              Create Account
            </button>

          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </main>
    </>
  );
}

export default Register;