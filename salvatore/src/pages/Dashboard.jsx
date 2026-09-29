import { Navigate, Link } from "react-router-dom";
import {
  Heart,
  ClipboardCheck,
  Wind,
  HeartHandshake,
  TrendingUp,
  ShieldCheck,
  Lock,
  ArrowRight,
  Sparkles,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";

function Dashboard() {
  const savedUser = localStorage.getItem("salvatoreUser");

  // Redirect logged-in users to their role dashboard
  if (savedUser) {
    const user = JSON.parse(savedUser);

    if (user.role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    }

    if (user.role === "counsellor") {
      return <Navigate to="/counsellor-dashboard" replace />;
    }

    if (user.role === "district") {
      return <Navigate to="/district-dashboard" replace />;
    }
  }

  // Public dashboard before login
  return (
    <>
      <Navbar />

      <main className="guest-dashboard-page">
        <div className="guest-dashboard-container">

          {/* HERO */}
          <section className="guest-dashboard-hero">
            <div>
              <span className="guest-dashboard-label">
                <Sparkles size={16} />
                SALVATORE WELLNESS SPACE
              </span>

              <h1>
                Your wellbeing journey
                <span> starts with one small check-in.</span>
              </h1>

              <p>
                Explore simple wellness tools, reflect on how you're feeling,
                practise healthy habits, and discover support when you need it.
              </p>

              <div className="guest-dashboard-actions">
                <Link to="/checkin" className="guest-primary-btn">
                  <ClipboardCheck size={18} />
                  Start a check-in
                  <ArrowRight size={17} />
                </Link>

                <Link to="/get-started" className="guest-secondary-btn">
                  Create an account
                </Link>
              </div>
            </div>

            <div className="guest-wellness-card">
              <div className="guest-wellness-icon">
                <Heart size={32} />
              </div>

              <span>TAKE A MOMENT FOR YOURSELF</span>

              <h2>How are you feeling today?</h2>

              <p>
                A few minutes of reflection can help you better understand
                your emotions and wellbeing.
              </p>

              <Link to="/checkin">
                Begin reflection
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>


          {/* WELLNESS OVERVIEW */}
          <section className="guest-overview-section">
            <div className="guest-section-heading">
              <div>
                <span>EXPLORE SALVATORE</span>
                <h2>Simple tools for everyday wellbeing</h2>
              </div>

              <TrendingUp size={28} />
            </div>

            <div className="guest-feature-grid">

              <Link to="/checkin" className="guest-feature-card">
                <div className="guest-feature-icon blue">
                  <ClipboardCheck size={26} />
                </div>

                <h3>Daily Check-in</h3>

                <p>
                  Take a moment to reflect on your mood, stress, and overall
                  wellbeing.
                </p>

                <span>
                  Start check-in
                  <ArrowRight size={16} />
                </span>
              </Link>


              <Link to="/breathe" className="guest-feature-card">
                <div className="guest-feature-icon purple">
                  <Wind size={26} />
                </div>

                <h3>Breathe & Reset</h3>

                <p>
                  Take a short pause and use guided breathing to slow down and
                  reset.
                </p>

                <span>
                  Start breathing
                  <ArrowRight size={16} />
                </span>
              </Link>


              <Link to="/support" className="guest-feature-card">
                <div className="guest-feature-icon green">
                  <HeartHandshake size={26} />
                </div>

                <h3>Find Support</h3>

                <p>
                  Explore wellness resources and learn about available support
                  options.
                </p>

                <span>
                  Explore support
                  <ArrowRight size={16} />
                </span>
              </Link>

            </div>
          </section>


          {/* LOGIN BENEFITS */}
          <section className="guest-login-section">

            <div className="guest-login-content">
              <div className="guest-login-icon">
                <Lock size={28} />
              </div>

              <div>
                <span>PERSONALISED EXPERIENCE</span>

                <h2>
                  Create an account to unlock your personalised dashboard
                </h2>

                <p>
                  Your account allows Salvatore to provide role-based access,
                  personalised monitoring, progress tracking, and appropriate
                  support pathways.
                </p>
              </div>
            </div>


            <div className="guest-login-benefits">

              <div>
                <ShieldCheck size={20} />
                <span>Privacy-focused access</span>
              </div>

              <div>
                <TrendingUp size={20} />
                <span>Track wellbeing patterns</span>
              </div>

              <div>
                <Users size={20} />
                <span>Role-based support system</span>
              </div>

            </div>


            <div className="guest-login-buttons">
              <Link to="/login" className="guest-login-btn">
                Login
              </Link>

              <Link to="/get-started" className="guest-register-btn">
                Get started
                <ArrowRight size={17} />
              </Link>
            </div>

          </section>


          {/* PRIVACY NOTE */}
          <section className="guest-privacy-note">
            <ShieldCheck size={24} />

            <div>
              <h3>Your privacy comes first</h3>

              <p>
                You can explore Salvatore's wellness tools without logging in.
                Personalised monitoring and role-based dashboards become
                available after creating an account.
              </p>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}

export default Dashboard;