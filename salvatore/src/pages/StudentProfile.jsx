import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  LockKeyhole,
  UserRound,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  Activity,
  Brain,
  CalendarDays,
  Eye,
  Mail,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import Navbar from "../components/Navbar";


function StudentProfile() {
  const [searchParams] = useSearchParams();

  const caseId = searchParams.get("case");


  // Demo case data for SIH prototype
  const cases = {
    "CASE-1042": {
      id: "CASE-1042",
      name: "Anonymous Case #1042",
      identityRevealed: false,
      score: 82,
      risk: "High",
      trend: "Increasing",
      checkIns: 12,
      indicators: [
        "High stress",
        "Sleep difficulty",
        "Negative emotional language",
      ],
      summary:
        "Repeated distress signals have been detected across multiple check-ins. The current trend indicates increasing concern.",
    },

    "CASE-1087": {
      id: "CASE-1087",
      name: "Anonymous Case #1087",
      identityRevealed: false,
      score: 68,
      risk: "High",
      trend: "Increasing",
      checkIns: 7,
      indicators: [
        "Feeling overwhelmed",
        "Social isolation",
      ],
      summary:
        "Multiple concern indicators have been observed, with distress signals increasing over recent check-ins.",
    },

    "CASE-1094": {
      id: "CASE-1094",
      name: "Anonymous Case #1094",
      identityRevealed: false,
      score: 55,
      risk: "Moderate",
      trend: "Stable",
      checkIns: 4,
      indicators: [
        "Moderate stress",
        "Difficulty concentrating",
      ],
      summary:
        "Moderate distress indicators are present. The pattern currently appears stable but should continue to be monitored.",
    },

    "CASE-1021": {
      id: "CASE-1021",
      name: "Priya Singh",
      email: "priya.singh@student.edu",
      identityRevealed: true,
      score: 91,
      risk: "Critical",
      trend: "Increasing",
      checkIns: 16,
      indicators: [
        "Persistent high distress",
        "Repeated negative emotional signals",
        "Escalation threshold reached",
      ],
      summary:
        "Persistent and increasing distress signals have reached the predefined escalation threshold, requiring priority review.",
    },
  };


  // Default profile if someone opens StudentProfile normally
  const savedUser = localStorage.getItem("salvatoreUser");

  const user = savedUser
    ? JSON.parse(savedUser)
    : null;


  const caseData = caseId ? cases[caseId] : null;


  const getRiskClass = (risk) => {
    if (risk === "Critical") return "critical";
    if (risk === "High") return "high";
    if (risk === "Moderate") return "moderate";

    return "low";
  };


  const riskClass = caseData
    ? getRiskClass(caseData.risk)
    : "low";


  const TrendIcon =
    caseData?.trend === "Increasing"
      ? TrendingUp
      : caseData?.trend === "Improving"
      ? TrendingDown
      : Activity;


  return (
    <>
      <Navbar />

      <main className="case-profile-page">
        <div className="case-profile-container">


          {/* BACK BUTTON */}

          <Link
            to="/counsellor-dashboard"
            className="back-home-btn"
          >
            <ArrowLeft size={18} />
            Back to monitoring
          </Link>


          {caseData ? (
            <>
              {/* CASE HEADER */}

              <section className="case-profile-header">

                <div className="case-profile-identity">

                  <div
                    className={`case-profile-avatar ${
                      caseData.identityRevealed
                        ? "revealed"
                        : "anonymous"
                    }`}
                  >
                    {caseData.identityRevealed ? (
                      <UserRound size={34} />
                    ) : (
                      <LockKeyhole size={34} />
                    )}
                  </div>


                  <div>

                    <span className="case-profile-label">
                      {caseData.identityRevealed
                        ? "ESCALATED CASE"
                        : "ANONYMOUS MONITORING CASE"}
                    </span>


                    <h1>
                      {caseData.name}
                    </h1>


                    <p>
                      {caseData.id}
                    </p>

                  </div>

                </div>


                <div
                  className={`case-risk-badge ${riskClass}`}
                >
                  <ShieldAlert size={18} />
                  {caseData.risk} Risk
                </div>

              </section>



              {/* PRIVACY STATUS */}

              <section
                className={`case-identity-status ${
                  caseData.identityRevealed
                    ? "revealed"
                    : "anonymous"
                }`}
              >

                {caseData.identityRevealed ? (
                  <>
                    <Eye size={22} />

                    <div>
                      <strong>
                        Identity access authorised
                      </strong>

                      <p>
                        Identity has been revealed because
                        predefined persistent-risk escalation
                        criteria were reached.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <LockKeyhole size={22} />

                    <div>
                      <strong>
                        Identity remains protected
                      </strong>

                      <p>
                        This individual remains anonymous during
                        routine monitoring. Personal identity is
                        not displayed to maintain privacy.
                      </p>
                    </div>
                  </>
                )}

              </section>



              {/* CASE OVERVIEW */}

              <section className="case-overview-grid">

                <div className="case-overview-card">

                  <span>DISTRESS SCORE</span>

                  <strong>
                    {caseData.score}
                    <small>/100</small>
                  </strong>

                  <div className="case-score-bar">
                    <div
                      className={riskClass}
                      style={{
                        width: `${caseData.score}%`,
                      }}
                    ></div>
                  </div>

                </div>


                <div className="case-overview-card">

                  <span>RISK LEVEL</span>

                  <strong
                    className={`case-risk-text ${riskClass}`}
                  >
                    {caseData.risk}
                  </strong>

                  <p>
                    Current prioritisation level
                  </p>

                </div>


                <div className="case-overview-card">

                  <span>TREND</span>

                  <strong className="case-trend">
                    <TrendIcon size={22} />
                    {caseData.trend}
                  </strong>

                  <p>
                    Pattern across recent check-ins
                  </p>

                </div>


                <div className="case-overview-card">

                  <span>CHECK-IN HISTORY</span>

                  <strong>
                    {caseData.checkIns}
                  </strong>

                  <p>
                    Check-ins analysed
                  </p>

                </div>

              </section>



              {/* AI ANALYSIS */}

              <section className="case-analysis-section">

                <div className="case-section-heading">

                  <div>

                    <span>
                      EXPLAINABLE AI ANALYSIS
                    </span>

                    <h2>
                      Why this case requires attention
                    </h2>

                  </div>

                  <Brain size={28} />

                </div>


                <div className="case-analysis-content">

                  <div className="case-analysis-summary">

                    <Brain size={24} />

                    <p>
                      {caseData.summary}
                    </p>

                  </div>


                  <div className="case-indicators">

                    <h3>
                      Detected concern indicators
                    </h3>


                    {caseData.indicators.map(
                      (indicator, index) => (
                        <div
                          className={`case-indicator ${riskClass}`}
                          key={index}
                        >

                          <span></span>

                          {indicator}

                        </div>
                      )
                    )}

                  </div>

                </div>

              </section>



              {/* CASE DETAILS */}

              <section className="case-details-section">

                <div className="case-section-heading">

                  <div>

                    <span>
                      CASE INFORMATION
                    </span>

                    <h2>
                      Monitoring details
                    </h2>

                  </div>

                  <CalendarDays size={28} />

                </div>


                <div className="case-details-grid">

                  <div className="case-detail-item">

                    <CalendarDays size={21} />

                    <div>
                      <span>
                        Monitoring duration
                      </span>

                      <strong>
                        {caseData.checkIns} recorded check-ins
                      </strong>
                    </div>

                  </div>


                  <div className="case-detail-item">

                    <Activity size={21} />

                    <div>
                      <span>
                        Current pattern
                      </span>

                      <strong>
                        {caseData.trend} distress trend
                      </strong>
                    </div>

                  </div>


                  <div className="case-detail-item">

                    <ShieldAlert size={21} />

                    <div>
                      <span>
                        Priority level
                      </span>

                      <strong>
                        {caseData.risk} monitoring priority
                      </strong>
                    </div>

                  </div>


                  <div className="case-detail-item">

                    <CheckCircle2 size={21} />

                    <div>
                      <span>
                        System status
                      </span>

                      <strong>
                        Active monitoring
                      </strong>
                    </div>

                  </div>

                </div>

              </section>



              {/* CONTACT */}

              <section className="case-contact-section">

                <div>

                  <span>
                    NEXT ACTION
                  </span>

                  <h2>
                    Review and provide appropriate support
                  </h2>

                  <p>
                    Use the available case information to review
                    the situation and determine appropriate
                    follow-up or support.
                  </p>

                </div>


                <div className="case-contact-actions">

                  {caseData.identityRevealed &&
                    caseData.email && (
                      <div className="revealed-email">

                        <Mail size={18} />

                        {caseData.email}

                      </div>
                    )}


                  <Link
                    to={`/messages?case=${caseData.id}`}
                    className="case-contact-btn"
                  >
                    <MessageCircle size={18} />

                    Contact / Send Support

                  </Link>

                </div>

              </section>



              {/* DISCLAIMER */}

              <p className="medical-note">
                Salvatore provides monitoring and prioritisation
                support based on reported check-in patterns. It
                does not provide a medical or psychological
                diagnosis. Final decisions and interventions
                remain with authorised professionals.
              </p>

            </>
          ) : (

            <>
              {/* NORMAL STUDENT PROFILE */}

              <section className="case-profile-header">

                <div className="case-profile-identity">

                  <div className="case-profile-avatar revealed">
                    {user?.name
                      ? user.name.charAt(0).toUpperCase()
                      : "S"}
                  </div>


                  <div>

                    <span className="case-profile-label">
                      STUDENT PROFILE
                    </span>

                    <h1>
                      {user?.name || "Student"}
                    </h1>

                    <p>
                      Your personal Salvatore wellness profile
                    </p>

                  </div>

                </div>

              </section>


              <section className="case-details-section">

                <div className="case-section-heading">

                  <div>

                    <span>
                      PROFILE INFORMATION
                    </span>

                    <h2>
                      Your account details
                    </h2>

                  </div>

                  <UserRound size={28} />

                </div>


                <div className="case-details-grid">

                  <div className="case-detail-item">

                    <Mail size={21} />

                    <div>
                      <span>Email</span>

                      <strong>
                        {user?.email ||
                          "student@example.com"}
                      </strong>
                    </div>

                  </div>


                  <div className="case-detail-item">

                    <UserRound size={21} />

                    <div>
                      <span>Role</span>

                      <strong>
                        Student
                      </strong>
                    </div>

                  </div>


                  <div className="case-detail-item">

                    <CalendarDays size={21} />

                    <div>
                      <span>Member Since</span>

                      <strong>
                        August 2026
                      </strong>
                    </div>

                  </div>

                </div>

              </section>

            </>
          )}

        </div>
      </main>
    </>
  );
}


export default StudentProfile;