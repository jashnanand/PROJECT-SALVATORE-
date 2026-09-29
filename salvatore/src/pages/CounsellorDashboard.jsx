import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Activity,
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  Clock3,
  Brain,
  LockKeyhole,
  UserRound,
  ArrowRight,
  Eye,
  MessageCircle,
  CheckCircle2,
  Send,
  BadgeAlert,
} from "lucide-react";

import Navbar from "../components/Navbar";

function CounsellorDashboard() {
  const [escalatedCases, setEscalatedCases] = useState(() => {
    const savedCases = localStorage.getItem("salvatoreEscalatedCases");

    return savedCases ? JSON.parse(savedCases) : [];
  });

  const cases = useMemo(() => {
    return [
      {
        id: "CASE-1042",
        name: "Anonymous Case #1042",
        score: 82,
        risk: "High",
        trend: "Increasing",
        days: 12,
        indicators: [
          "High stress",
          "Sleep difficulty",
          "Negative emotional language",
        ],
        priority: "Critical",
        identityRevealed: false,
      },
      {
        id: "CASE-1087",
        name: "Anonymous Case #1087",
        score: 68,
        risk: "High",
        trend: "Increasing",
        days: 7,
        indicators: [
          "Feeling overwhelmed",
          "Social isolation",
        ],
        priority: "High",
        identityRevealed: false,
      },
      {
        id: "CASE-1094",
        name: "Anonymous Case #1094",
        score: 55,
        risk: "Moderate",
        trend: "Stable",
        days: 4,
        indicators: [
          "Moderate stress",
          "Difficulty concentrating",
        ],
        priority: "Medium",
        identityRevealed: false,
      },
      {
        id: "CASE-1021",
        name: "Priya Singh",
        score: 91,
        risk: "Critical",
        trend: "Increasing",
        days: 16,
        indicators: [
          "Persistent high distress",
          "Repeated negative emotional signals",
          "Escalation threshold reached",
        ],
        priority: "Critical",
        identityRevealed: true,
      },
    ];
  }, []);

  const criticalCases = cases.filter(
    (item) =>
      item.priority === "Critical" ||
      item.risk === "Critical"
  ).length;

  const highRiskCases = cases.filter(
    (item) =>
      item.risk === "High" ||
      item.risk === "Critical"
  ).length;

  const persistentCases = cases.filter(
    (item) => item.days >= 7
  ).length;

  const getRiskClass = (risk) => {
    if (risk === "Critical") return "critical";
    if (risk === "High") return "high";
    if (risk === "Moderate") return "moderate";

    return "low";
  };

  const isEscalated = (caseId) => {
    return escalatedCases.includes(caseId);
  };

  const handleEscalate = (item) => {
    if (isEscalated(item.id)) return;

    const updatedCases = [...escalatedCases, item.id];

    setEscalatedCases(updatedCases);

    localStorage.setItem(
      "salvatoreEscalatedCases",
      JSON.stringify(updatedCases)
    );

    alert(
      `${item.id} has been escalated to the District Officer for intervention.`
    );
  };

  return (
    <>
      <Navbar />

      <main className="sih-counsellor-page">
        <div className="sih-counsellor-container">

          {/* HEADER */}

          <section className="sih-counsellor-header">
            <div>
              <span className="counsellor-label">
                SALVATORE MONITORING SYSTEM
              </span>

              <h1>
                Distress Monitoring Dashboard
              </h1>

              <p>
                Monitor anonymous cases, identify persistent
                distress patterns, and prioritise individuals
                who may require timely support.
              </p>
            </div>

            <div className="counsellor-online-status">
              <span></span>
              Monitoring Active
            </div>
          </section>


          {/* TOP STATS */}

          <section className="sih-dashboard-stats">

            <div className="sih-stat-card">
              <div className="sih-stat-icon blue">
                <Users size={24} />
              </div>

              <div>
                <span>ACTIVE CASES</span>
                <strong>{cases.length}</strong>
                <p>Currently under monitoring</p>
              </div>
            </div>


            <div className="sih-stat-card">
              <div className="sih-stat-icon red">
                <AlertTriangle size={24} />
              </div>

              <div>
                <span>HIGH RISK</span>
                <strong>{highRiskCases}</strong>
                <p>Cases requiring attention</p>
              </div>
            </div>


            <div className="sih-stat-card">
              <div className="sih-stat-icon orange">
                <Clock3 size={24} />
              </div>

              <div>
                <span>PERSISTENT DISTRESS</span>
                <strong>{persistentCases}</strong>
                <p>Repeated concern signals</p>
              </div>
            </div>


            <div className="sih-stat-card">
              <div className="sih-stat-icon purple">
                <ShieldAlert size={24} />
              </div>

              <div>
                <span>CRITICAL ALERTS</span>
                <strong>{criticalCases}</strong>
                <p>Priority review required</p>
              </div>
            </div>

          </section>


          {/* AI INSIGHT */}

          <section className="counsellor-ai-insight">
            <div className="ai-insight-icon">
              <Brain size={30} />
            </div>

            <div>
              <span>AI PRIORITISATION INSIGHT</span>

              <h2>
                Cases are ranked using dynamic distress patterns
              </h2>

              <p>
                Salvatore considers distress score, trend,
                repeated concern signals, and duration of
                distress to help prioritise cases for review.
              </p>
            </div>
          </section>


          {/* CASE SECTION */}

          <section className="monitoring-cases-section">

            <div className="monitoring-section-header">
              <div>
                <span>PRIORITY MONITORING</span>
                <h2>Cases requiring review</h2>
              </div>

              <div className="priority-legend">
                <span className="legend critical">
                  Critical
                </span>

                <span className="legend high">
                  High
                </span>

                <span className="legend moderate">
                  Moderate
                </span>
              </div>
            </div>


            <div className="monitoring-case-list">

              {cases.map((item) => (
                <div
                  className={`monitoring-case-card ${getRiskClass(
                    item.risk
                  )}`}
                  key={item.id}
                >

                  {/* CASE TOP */}

                  <div className="case-top">

                    <div className="case-identity">

                      <div className="case-avatar">
                        {item.identityRevealed ? (
                          <UserRound size={24} />
                        ) : (
                          <LockKeyhole size={24} />
                        )}
                      </div>

                      <div>
                        <h3>{item.name}</h3>
                        <span>{item.id}</span>
                      </div>

                    </div>

                    <div
                      className={`priority-badge ${item.priority.toLowerCase()}`}
                    >
                      {item.priority} Priority
                    </div>

                  </div>


                  {/* CASE DATA */}

                  <div className="case-data-grid">

                    <div>
                      <span>DISTRESS SCORE</span>
                      <strong>{item.score}/100</strong>
                    </div>

                    <div>
                      <span>RISK LEVEL</span>

                      <strong
                        className={`risk-text ${getRiskClass(
                          item.risk
                        )}`}
                      >
                        {item.risk}
                      </strong>
                    </div>

                    <div>
                      <span>TREND</span>

                      <strong className="trend-value">
                        {item.trend === "Increasing" ? (
                          <TrendingUp size={17} />
                        ) : item.trend === "Improving" ? (
                          <TrendingDown size={17} />
                        ) : (
                          <Activity size={17} />
                        )}

                        {item.trend}
                      </strong>
                    </div>

                    <div>
                      <span>PERSISTENCE</span>
                      <strong>{item.days} check-ins</strong>
                    </div>

                  </div>


                  {/* AI EXPLANATION */}

                  <div className="case-ai-reason">

                    <Brain size={18} />

                    <div>
                      <span>WHY FLAGGED</span>

                      <p>
                        {item.indicators.join(" • ")}
                      </p>
                    </div>

                  </div>


                  {/* PRIVACY */}

                  <div
                    className={`case-privacy ${
                      item.identityRevealed
                        ? "revealed"
                        : "anonymous"
                    }`}
                  >

                    {item.identityRevealed ? (
                      <>
                        <Eye size={17} />

                        Identity access authorised after
                        persistent-risk escalation criteria
                        were reached.
                      </>
                    ) : (
                      <>
                        <LockKeyhole size={17} />

                        Identity remains protected during
                        routine monitoring.
                      </>
                    )}

                  </div>


                  {/* ESCALATION STATUS */}

                  {isEscalated(item.id) && (
                    <div className="case-escalated-status">
                      <BadgeAlert size={18} />

                      <div>
                        <strong>
                          Escalated to District Authority
                        </strong>

                        <span>
                          Awaiting district-level intervention.
                        </span>
                      </div>
                    </div>
                  )}


                  {/* ACTIONS */}

                  <div className="case-actions">

                    <Link
                      to="/student-profile"
                      className="case-view-btn"
                    >
                      <Eye size={17} />
                      View Case
                    </Link>


                    <Link
                      to="/messages"
                      className="case-message-btn"
                    >
                      <MessageCircle size={17} />
                      Contact
                    </Link>


                    {(item.risk === "High" ||
                      item.risk === "Critical") && (
                      <button
                        type="button"
                        className={`case-escalate-btn ${
                          isEscalated(item.id)
                            ? "escalated"
                            : ""
                        }`}
                        onClick={() =>
                          handleEscalate(item)
                        }
                        disabled={isEscalated(item.id)}
                      >
                        {isEscalated(item.id) ? (
                          <>
                            <CheckCircle2 size={17} />
                            Escalated
                          </>
                        ) : (
                          <>
                            <Send size={17} />
                            Escalate Case
                          </>
                        )}
                      </button>
                    )}


                    <ArrowRight size={19} />

                  </div>

                </div>
              ))}

            </div>

          </section>


          {/* PRIVACY PROTOCOL */}

          <section className="counsellor-privacy-note">

            <div>
              <LockKeyhole size={24} />

              <div>
                <h3>
                  Privacy-first monitoring
                </h3>

                <p>
                  Personal identity remains hidden during normal
                  monitoring. Authorised identity access is only
                  considered after predefined persistent-risk
                  thresholds and escalation protocols are met.
                </p>
              </div>
            </div>

            <CheckCircle2 size={28} />

          </section>

        </div>
      </main>
    </>
  );
}

export default CounsellorDashboard;