import { Link } from "react-router-dom";
import {
  Activity,
  CalendarDays,
  UserRound,
  MessageCircle,
  ArrowRight,
  ShieldAlert,
  Wind,
  Moon,
  Sparkles,
  CircleAlert,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";

import Navbar from "../components/Navbar";

function StudentDashboard() {
  const currentUser = JSON.parse(
    localStorage.getItem("salvatoreCurrentUser")
  );

  const userName = currentUser?.name || "User";
  const firstName = userName.split(" ")[0];

  // Demo data for now
  const distressScore = 42;

  let riskLevel = "Low";
  let riskClass = "risk-low";

  if (distressScore >= 75) {
    riskLevel = "High";
    riskClass = "risk-high";
  } else if (distressScore >= 50) {
    riskLevel = "Moderate";
    riskClass = "risk-moderate";
  }

  return (
    <>
      <Navbar />

      <main className="student-dashboard-page">
        <div className="student-dashboard-container">

          {/* WELCOME */}

          <section className="student-welcome">
            <div>
              <span className="dashboard-label">
                PERSONAL WELL-BEING SPACE
              </span>

              <h1>Hello, {firstName} 👋</h1>

              <p>
                Your well-being matters. Regular check-ins help Salvatore
                understand changes in how you are feeling and connect you
                with appropriate support when needed.
              </p>
            </div>

            <Link to="/checkin" className="dashboard-checkin-btn">
              <HeartHandshake size={19} />
              Well-being Check-in
            </Link>
          </section>


          {/* DYNAMIC DISTRESS SCORE */}

          <section className="wellness-overview">

            <div className="overview-main">
              <div className="overview-icon">
                <Activity size={30} />
              </div>

              <div>
                <span>DYNAMIC DISTRESS STATUS</span>

                <h2>
                  Your current level is {riskLevel.toLowerCase()}
                </h2>

                <p>
                  This score is based on your check-ins, wellbeing responses,
                  and changes in your recent patterns.
                </p>
              </div>
            </div>


            <div className={`wellness-score ${riskClass}`}>
              <strong>{distressScore}</strong>
              <span>/100</span>

              <p>Distress Score</p>

              <small>{riskLevel} Concern</small>
            </div>

          </section>


          {/* STATUS CARDS */}

          <section className="student-stats">

            <div className="student-stat-card">
              <div className="stat-icon stat-yellow">
                <CalendarDays size={22} />
              </div>

              <div>
                <span>LAST CHECK-IN</span>
                <strong>Today</strong>
              </div>
            </div>


            <div className="student-stat-card">
              <div className="stat-icon stat-blue">
                <TrendingUp size={22} />
              </div>

              <div>
                <span>RECENT TREND</span>
                <strong>Stable</strong>
              </div>
            </div>


            <div className="student-stat-card">
              <div className="stat-icon stat-green">
                <ShieldAlert size={22} />
              </div>

              <div>
                <span>SUPPORT STATUS</span>
                <strong>Monitoring Active</strong>
              </div>
            </div>

          </section>


          {/* SUPPORT PERSON + RECOMMENDATIONS */}

          <section className="dashboard-middle-grid">

            {/* COUNSELLOR */}

            <div className="assigned-counsellor">

              <div className="section-title-row">
                <div>
                  <span>YOUR SUPPORT CONTACT</span>
                  <h2>Assigned Counsellor</h2>
                </div>

                <UserRound size={25} />
              </div>


              <div className="counsellor-profile">

                <div className="counsellor-avatar">
                  <UserRound size={32} />
                </div>


                <div className="counsellor-details">

                  <div className="counsellor-name-row">
                    <h3>Dr. Ananya Sharma</h3>

                    <span className="available-status">
                      <i></i>
                      Available now
                    </span>
                  </div>

                  <p>Well-being Support Counsellor</p>

                  <p className="counsellor-description">
                    Your assigned support counsellor can review relevant
                    wellbeing patterns and provide appropriate guidance
                    and follow-up when required.
                  </p>

                </div>

              </div>


              <div className="counsellor-actions">

                <Link to="/counsellor-profile" className="profile-btn">
                  <UserRound size={17} />
                  View Profile
                </Link>

                <Link to="/messages" className="message-btn">
                  <MessageCircle size={17} />
                  Message
                </Link>

              </div>

            </div>


            {/* RECOMMENDATIONS */}

            <div className="dashboard-recommendations">

              <div className="section-title-row">
                <div>
                  <span>RECOMMENDED FOR YOU</span>
                  <h2>Support options</h2>
                </div>

                <Sparkles size={25} />
              </div>


              <Link
                to="/breathe"
                className="recommendation-card recommendation-blue"
              >
                <div className="recommendation-icon">
                  <Wind size={24} />
                </div>

                <div>
                  <h3>Take a breathing break</h3>
                  <p>
                    A short guided breathing session can help you pause
                    and reset.
                  </p>
                </div>

                <ArrowRight size={19} />
              </Link>


              <Link
                to="/support"
                className="recommendation-card recommendation-yellow"
              >
                <div className="recommendation-icon">
                  <CircleAlert size={24} />
                </div>

                <div>
                  <h3>Explore support options</h3>
                  <p>
                    Find counselling, protection, legal, financial,
                    and rehabilitation support options.
                  </p>
                </div>

                <ArrowRight size={19} />
              </Link>

            </div>

          </section>


          {/* QUICK ACTIONS */}

          <section className="quick-actions-section">

            <div className="section-title-row">
              <div>
                <span>QUICK ACTIONS</span>
                <h2>How can we support you?</h2>
              </div>
            </div>


            <div className="quick-actions-grid">

              <Link to="/checkin" className="quick-action-card">
                <HeartHandshake size={27} />
                <h3>Well-being Check-in</h3>
                <p>
                  Tell Salvatore how you have been feeling recently.
                </p>
                <ArrowRight size={18} />
              </Link>


              <Link to="/history" className="quick-action-card">
                <Activity size={27} />
                <h3>My Well-being Journey</h3>
                <p>
                  Explore changes and patterns in your wellbeing over time.
                </p>
                <ArrowRight size={18} />
              </Link>


              <Link to="/support" className="quick-action-card">
                <CircleAlert size={27} />
                <h3>Request Support</h3>
                <p>
                  Explore available counselling and other support options.
                </p>
                <ArrowRight size={18} />
              </Link>

            </div>

          </section>

        </div>
      </main>
    </>
  );
}

export default StudentDashboard;