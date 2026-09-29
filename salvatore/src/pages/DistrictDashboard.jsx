import { useMemo, useState } from "react";

import {
  Building2,
  Users,
  AlertTriangle,
  ShieldAlert,
  Clock3,
  Brain,
  TrendingUp,
  MapPin,
  HeartHandshake,
  CheckCircle2,
  Activity,
  Send,
  PlayCircle,
  CircleCheck,
  Bell,
  Siren,
} from "lucide-react";

import Navbar from "../components/Navbar";

function DistrictDashboard() {
  const [escalatedCases, setEscalatedCases] = useState(() => {
    const savedCases = localStorage.getItem(
      "salvatoreEscalatedCases"
    );

    return savedCases ? JSON.parse(savedCases) : [];
  });

  const [interventionStatus, setInterventionStatus] = useState(() => {
    const savedStatus = localStorage.getItem(
      "salvatoreInterventionStatus"
    );

    return savedStatus ? JSON.parse(savedStatus) : {};
  });

  const baseCases = useMemo(() => {
    return [
      {
        id: "CASE-1042",
        area: "Zone A",
        score: 82,
        risk: "High",
        trend: "Increasing",
        intervention: "Counselling Support",
        status: "Pending",
      },
      {
        id: "CASE-1087",
        area: "Zone C",
        score: 76,
        risk: "High",
        trend: "Increasing",
        intervention: "Protection Support",
        status: "In Progress",
      },
      {
        id: "CASE-1021",
        area: "Zone B",
        score: 91,
        risk: "Critical",
        trend: "Increasing",
        intervention: "Emergency Support",
        status: "Pending",
      },
      {
        id: "CASE-1094",
        area: "Zone D",
        score: 55,
        risk: "Moderate",
        trend: "Stable",
        intervention: "Counselling Support",
        status: "In Progress",
      },
      {
        id: "CASE-1108",
        area: "Zone A",
        score: 48,
        risk: "Moderate",
        trend: "Improving",
        intervention: "Legal & Financial Aid",
        status: "Completed",
      },
    ];
  }, []);

  const cases = useMemo(() => {
    return baseCases.map((item) => ({
      ...item,
      escalated: escalatedCases.includes(item.id),
    }));
  }, [baseCases, escalatedCases]);

  const getCurrentStatus = (item) => {
    return interventionStatus[item.id] || item.status;
  };

  const totalCases = cases.length;

  const highRiskCases = cases.filter(
    (item) =>
      item.risk === "High" ||
      item.risk === "Critical"
  ).length;

  const pendingCases = cases.filter(
    (item) => getCurrentStatus(item) === "Pending"
  ).length;

  const activeInterventions = cases.filter(
    (item) => getCurrentStatus(item) === "In Progress"
  ).length;

  const criticalCases = cases.filter(
    (item) => item.risk === "Critical"
  ).length;

  const getRiskClass = (risk) => {
    if (risk === "Critical") return "critical";
    if (risk === "High") return "high";
    if (risk === "Moderate") return "moderate";

    return "low";
  };

  const getStatusClass = (status) => {
    if (status === "Pending") return "pending";
    if (status === "In Progress") return "progress";

    return "completed";
  };

  const updateIntervention = (caseId, newStatus) => {
    const updatedStatus = {
      ...interventionStatus,
      [caseId]: newStatus,
    };

    setInterventionStatus(updatedStatus);

    localStorage.setItem(
      "salvatoreInterventionStatus",
      JSON.stringify(updatedStatus)
    );
  };

  const markEscalationsAsViewed = () => {
    localStorage.setItem(
      "salvatoreEscalatedCasesViewed",
      "true"
    );
  };

  return (
    <>
      <Navbar />

      <main className="district-page">
        <div className="district-container">

          {/* HEADER */}

          <section className="district-header">
            <div>
              <span className="district-label">
                DISTRICT MONITORING & RESPONSE
              </span>

              <h1>
                District Intervention Dashboard
              </h1>

              <p>
                Monitor high-risk cases across the district,
                prioritise urgent situations, and coordinate
                counselling, protection, emergency response,
                legal aid, and rehabilitation support.
              </p>
            </div>

            <div className="district-header-actions">
              <div className="district-location">
                <MapPin size={18} />
                Demo District
              </div>

              <div className="district-alert-count">
                <Bell size={18} />
                {escalatedCases.length} New Alert
                {escalatedCases.length !== 1 ? "s" : ""}
              </div>
            </div>
          </section>


          {/* ESCALATED ALERT */}

          {escalatedCases.length > 0 && (
            <section className="district-escalation-alert">
              <div className="district-escalation-icon">
                <Siren size={27} />
              </div>

              <div className="district-escalation-content">
                <span>NEW ESCALATION RECEIVED</span>

                <h3>
                  {escalatedCases.length} case
                  {escalatedCases.length > 1 ? "s" : ""}{" "}
                  require district-level attention
                </h3>

                <p>
                  These cases have been escalated after
                  counsellor review due to persistent or
                  critical risk indicators.
                </p>
              </div>

              <button
                className="district-alert-action"
                onClick={markEscalationsAsViewed}
              >
                <CheckCircle2 size={17} />
                Acknowledge
              </button>
            </section>
          )}


          {/* STATS */}

          <section className="district-stats">

            <div className="district-stat-card">
              <div className="district-stat-icon blue">
                <Users size={24} />
              </div>

              <div>
                <span>TOTAL ACTIVE CASES</span>
                <strong>{totalCases}</strong>
                <p>Currently under district monitoring</p>
              </div>
            </div>


            <div className="district-stat-card">
              <div className="district-stat-icon red">
                <AlertTriangle size={24} />
              </div>

              <div>
                <span>HIGH PRIORITY</span>
                <strong>{highRiskCases}</strong>
                <p>High and critical risk cases</p>
              </div>
            </div>


            <div className="district-stat-card">
              <div className="district-stat-icon orange">
                <Clock3 size={24} />
              </div>

              <div>
                <span>PENDING ACTION</span>
                <strong>{pendingCases}</strong>
                <p>Cases awaiting intervention</p>
              </div>
            </div>


            <div className="district-stat-card">
              <div className="district-stat-icon green">
                <HeartHandshake size={24} />
              </div>

              <div>
                <span>ACTIVE SUPPORT</span>
                <strong>{activeInterventions}</strong>
                <p>Interventions currently in progress</p>
              </div>
            </div>

          </section>


          {/* AI PRIORITISATION */}

          <section className="district-ai-insight">

            <div className="district-ai-icon">
              <Brain size={30} />
            </div>

            <div>
              <span>AI-ASSISTED CASE PRIORITISATION</span>

              <h2>
                Resources are prioritised based on risk and urgency
              </h2>

              <p>
                Salvatore analyses distress severity, longitudinal
                trends, repeated concern signals, persistence,
                escalation status, and intervention progress to
                support faster district-level decision making.
              </p>
            </div>

          </section>


          {/* DISTRICT RISK OVERVIEW */}

          <section className="district-risk-overview">

            <div className="district-section-header">
              <div>
                <span>DISTRICT RISK OVERVIEW</span>

                <h2>
                  Risk distribution across monitored zones
                </h2>

                <p className="risk-overview-subtitle">
                  Identify geographical areas requiring greater
                  attention and resource allocation.
                </p>
              </div>

              <TrendingUp size={28} />
            </div>


            <div className="risk-overview-grid">

              <div className="risk-overview-card critical">
                <div className="risk-overview-top">
                  <span className="risk-dot critical"></span>
                  <span>CRITICAL RISK</span>
                </div>

                <strong>{criticalCases}</strong>

                <p>
                  Zone currently requiring immediate intervention
                </p>

                <div className="risk-zone-list">
                  <span>Zone B</span>
                </div>
              </div>


              <div className="risk-overview-card high">
                <div className="risk-overview-top">
                  <span className="risk-dot high"></span>
                  <span>HIGH RISK</span>
                </div>

                <strong>2</strong>

                <p>
                  Zones showing persistent or increasing distress
                </p>

                <div className="risk-zone-list">
                  <span>Zone A</span>
                  <span>Zone C</span>
                </div>
              </div>


              <div className="risk-overview-card moderate">
                <div className="risk-overview-top">
                  <span className="risk-dot moderate"></span>
                  <span>MODERATE RISK</span>
                </div>

                <strong>2</strong>

                <p>
                  Zones requiring continued monitoring and support
                </p>

                <div className="risk-zone-list">
                  <span>Zone A</span>
                  <span>Zone D</span>
                </div>
              </div>


              <div className="risk-overview-card trend">
                <div className="risk-overview-top">
                  <Activity size={19} />
                  <span>OVERALL TREND</span>
                </div>

                <strong>Increasing</strong>

                <p>
                  Multiple zones are showing increasing distress
                  signals and require proactive intervention.
                </p>

                <div className="district-trend-bar">
                  <span className="trend-fill"></span>
                </div>
              </div>

            </div>


            <div className="district-zone-summary">

              <div className="zone-summary-header">
                <h3>Zone-wise monitoring status</h3>
                <span>Live prototype data</span>
              </div>


              <div className="zone-summary-list">

                <div className="zone-summary-item">
                  <div>
                    <strong>Zone A</strong>
                    <span>2 monitored cases</span>
                  </div>

                  <span className="zone-risk-badge high">
                    High Risk
                  </span>
                </div>


                <div className="zone-summary-item">
                  <div>
                    <strong>Zone B</strong>
                    <span>1 monitored case</span>
                  </div>

                  <span className="zone-risk-badge critical">
                    Critical
                  </span>
                </div>


                <div className="zone-summary-item">
                  <div>
                    <strong>Zone C</strong>
                    <span>1 monitored case</span>
                  </div>

                  <span className="zone-risk-badge high">
                    High Risk
                  </span>
                </div>


                <div className="zone-summary-item">
                  <div>
                    <strong>Zone D</strong>
                    <span>1 monitored case</span>
                  </div>

                  <span className="zone-risk-badge moderate">
                    Moderate
                  </span>
                </div>

              </div>

            </div>

          </section>


          {/* PRIORITY CASES */}

          <section className="district-cases-section">

            <div className="district-section-header">
              <div>
                <span>PRIORITY CASE MANAGEMENT</span>

                <h2>
                  Cases requiring district-level action
                </h2>
              </div>

              <Activity size={28} />
            </div>


            <div className="district-case-list">

              {cases.map((item) => {
                const currentStatus =
                  getCurrentStatus(item);

                return (
                  <div
                    className={`district-case-card ${getRiskClass(
                      item.risk
                    )} ${
                      item.escalated
                        ? "district-escalated-case"
                        : ""
                    }`}
                    key={item.id}
                  >

                    {item.escalated && (
                      <div className="district-escalated-tag">
                        <Send size={15} />
                        ESCALATED FROM COUNSELLOR
                      </div>
                    )}


                    <div className="district-case-top">

                      <div>
                        <span className="case-id">
                          {item.id}
                        </span>

                        <h3>{item.area}</h3>
                      </div>


                      <div
                        className={`district-risk-badge ${getRiskClass(
                          item.risk
                        )}`}
                      >
                        {item.risk} Risk
                      </div>

                    </div>


                    <div className="district-case-grid">

                      <div>
                        <span>DISTRESS SCORE</span>
                        <strong>{item.score}/100</strong>
                      </div>


                      <div>
                        <span>RISK TREND</span>

                        <strong className="district-trend">
                          {item.trend === "Increasing" ? (
                            <TrendingUp size={17} />
                          ) : (
                            <Activity size={17} />
                          )}

                          {item.trend}
                        </strong>
                      </div>


                      <div>
                        <span>RECOMMENDED SUPPORT</span>
                        <strong>
                          {item.intervention}
                        </strong>
                      </div>


                      <div>
                        <span>INTERVENTION STATUS</span>

                        <strong
                          className={`intervention-status ${getStatusClass(
                            currentStatus
                          )}`}
                        >
                          {currentStatus}
                        </strong>
                      </div>

                    </div>


                    <div className="district-case-footer">
                      <p>
                        AI recommendation generated using distress
                        severity, longitudinal pattern, escalation
                        signals, and current intervention
                        requirements.
                      </p>
                    </div>


                    {/* INTERVENTION ACTIONS */}

                    <div className="district-action-row">

                      {currentStatus === "Pending" && (
                        <button
                          className="district-start-btn"
                          onClick={() =>
                            updateIntervention(
                              item.id,
                              "In Progress"
                            )
                          }
                        >
                          <PlayCircle size={17} />
                          Start Intervention
                        </button>
                      )}


                      {currentStatus === "In Progress" && (
                        <button
                          className="district-complete-btn"
                          onClick={() =>
                            updateIntervention(
                              item.id,
                              "Completed"
                            )
                          }
                        >
                          <CircleCheck size={17} />
                          Mark Completed
                        </button>
                      )}


                      {currentStatus === "Completed" && (
                        <div className="district-completed-message">
                          <CheckCircle2 size={18} />
                          Intervention completed successfully
                        </div>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          </section>


          {/* INTERVENTION TYPES */}

          <section className="intervention-section">

            <div className="district-section-header">
              <div>
                <span>COORDINATED RESPONSE SYSTEM</span>

                <h2>
                  Available intervention pathways
                </h2>
              </div>

              <Building2 size={28} />
            </div>


            <div className="intervention-grid">

              <div className="intervention-card">
                <HeartHandshake size={25} />

                <h3>Counselling Support</h3>

                <p>
                  Connect vulnerable individuals with appropriate
                  mental health and counselling services.
                </p>
              </div>


              <div className="intervention-card">
                <ShieldAlert size={25} />

                <h3>Protection Support</h3>

                <p>
                  Escalate cases involving threats, intimidation,
                  or immediate safety concerns.
                </p>
              </div>


              <div className="intervention-card">
                <CheckCircle2 size={25} />

                <h3>Legal & Financial Aid</h3>

                <p>
                  Coordinate legal assistance, compensation,
                  rehabilitation, and welfare support.
                </p>
              </div>

            </div>

          </section>


          {/* PRIVACY NOTE */}

          <section className="district-privacy-note">

            <ShieldAlert size={23} />

            <p>
              District-level access follows role-based privacy
              controls. Sensitive personal information should only
              be accessible to authorised officials when required
              under predefined escalation and intervention
              protocols.
            </p>

          </section>

        </div>
      </main>
    </>
  );
}

export default DistrictDashboard;