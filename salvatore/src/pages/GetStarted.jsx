import { Link } from "react-router-dom";
import {
  GraduationCap,
  HeartHandshake,
  Building2,
  ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";

function GetStarted() {
  return (
    <>
      <Navbar />

      <main className="get-started-page">
        <section className="get-started-container">

          <div className="get-started-heading">
            <span className="welcome-label">
              ✨ Welcome to Salvatore
            </span>

            <h1>How would you like to continue?</h1>

            <p>
              Choose your role to get a personalized experience.
            </p>
          </div>


          <div className="role-cards">

            {/* STUDENT */}

            <Link
              to="/register?role=student"
              className="role-card student-role"
            >
              <div className="role-icon">
                <GraduationCap size={42} />
              </div>

              <h2>I'm a Student</h2>

              <p>
                Track your wellbeing, reflect on your emotions,
                and connect with support when needed.
              </p>

              <div className="role-continue">
                Continue
                <ArrowRight size={20} />
              </div>
            </Link>


            {/* COUNSELLOR */}

            <Link
              to="/register?role=counsellor"
              className="role-card counsellor-role"
            >
              <div className="role-icon">
                <HeartHandshake size={42} />
              </div>

              <h2>I'm a Counsellor</h2>

              <p>
                Monitor individual wellbeing, understand distress
                patterns, and provide timely support.
              </p>

              <div className="role-continue">
                Continue
                <ArrowRight size={20} />
              </div>
            </Link>


            {/* DISTRICT OFFICER */}

            <Link
              to="/register?role=district"
              className="role-card district-role"
            >
              <div className="role-icon">
                <Building2 size={42} />
              </div>

              <h2>I'm a District Officer</h2>

              <p>
                Monitor district-level trends, prioritise vulnerable
                cases, and coordinate intervention support.
              </p>

              <div className="role-continue">
                Continue
                <ArrowRight size={20} />
              </div>
            </Link>

          </div>

        </section>
      </main>
    </>
  );
}

export default GetStarted;