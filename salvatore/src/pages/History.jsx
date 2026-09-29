import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Plus,
  ShieldAlert,
  Brain,
  Activity,
  LockKeyhole,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import Navbar from "../components/Navbar";

function History() {
  const [history] = useState(() => {
    return JSON.parse(
      localStorage.getItem("salvatoreHistory") || "[]"
    );
  });

  // =========================
  // CHART DATA
  // =========================

  const chartData = useMemo(() => {
    return history.map((entry, index) => ({
      index: index + 1,
      date: new Date(entry.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      score: entry.score,
    }));
  }, [history]);

  const latestEntry = history[history.length - 1];

  // =========================
  // TREND ANALYSIS
  // =========================

  const trendData = useMemo(() => {
    if (history.length < 2) {
      return {
        change: 0,
        trend: "Not enough data",
        trendType: "neutral",
      };
    }

    const latestScore =
      history[history.length - 1].score;

    const previousScore =
      history[history.length - 2].score;

    const change = latestScore - previousScore;

    if (change > 5) {
      return {
        change,
        trend: "Increasing concern",
        trendType: "up",
      };
    }

    if (change < -5) {
      return {
        change: Math.abs(change),
        trend: "Improving",
        trendType: "down",
      };
    }

    return {
      change: Math.abs(change),
      trend: "Stable",
      trendType: "neutral",
    };
  }, [history]);

  // =========================
  // PERSISTENT DISTRESS
  // =========================

  const persistentDistress = useMemo(() => {
    if (history.length === 0) {
      return {
        count: 0,
        level: "No data",
        escalated: false,
      };
    }

    let count = 0;

    // Count recent Moderate / High distress entries
    for (let i = history.length - 1; i >= 0; i--) {
      const entry = history[i];

      if (
        entry.riskLevel === "High" ||
        entry.riskLevel === "Moderate"
      ) {
        count++;
      } else {
        break;
      }
    }

    let level = "Stable";
    let escalated = false;

    if (count >= 15) {
      level = "Persistent high-risk pattern";
      escalated = true;
    } else if (count >= 7) {
      level = "Persistent distress detected";
    } else if (count >= 3) {
      level = "Repeated distress signals";
    }

    return {
      count,
      level,
      escalated,
    };
  }, [history]);

  // =========================
  // PREDICTIVE INSIGHT
  // =========================

  const prediction = useMemo(() => {
    if (history.length < 3) {
      return {
        text: "More check-ins are needed before a reliable distress trend can be identified.",
        type: "neutral",
      };
    }

    const recentEntries = history.slice(-3);

    const average =
      recentEntries.reduce(
        (sum, entry) => sum + entry.score,
        0
      ) / recentEntries.length;

    const latestScore =
      recentEntries[recentEntries.length - 1].score;

    if (latestScore > average + 8) {
      return {
        text: "Recent distress signals are increasing compared with your earlier check-ins. Continued monitoring is recommended.",
        type: "warning",
      };
    }

    if (latestScore < average - 8) {
      return {
        text: "Your recent distress signals appear to be improving compared with earlier check-ins.",
        type: "positive",
      };
    }

    return {
      text: "Your recent distress pattern appears relatively stable. Continued check-ins help detect future changes.",
      type: "neutral",
    };
  }, [history]);

  // =========================
  // ESCALATION STATUS
  // =========================

  const escalationStatus = persistentDistress.escalated
    ? {
        title: "Escalation criteria reached",
        description:
          "A persistent distress pattern has been detected. In a real deployment, this case could be flagged for authorised support follow-up according to privacy and escalation rules.",
        status: "escalated",
      }
    : {
        title: "Identity protection active",
        description:
          "Your personal identity remains protected during routine monitoring. Escalation would only occur when predefined persistent-risk criteria and authorised protocols are met.",
        status: "protected",
      };

  // =========================
  // EMPTY STATE
  // =========================

  if (history.length === 0) {
    return (
      <>
        <Navbar />

        <main className="journey-page">
          <div className="journey-container">
            <Link to="/" className="back-home-btn">
              <ArrowLeft size={18} />
              Back home
            </Link>

            <section className="journey-header">
              <div>
                <div className="journey-label">
                  <Sparkles size={16} />
                  LONGITUDINAL DISTRESS MONITORING
                </div>

                <h1>Your monitoring journey starts here.</h1>

                <p>
                  Regular check-ins allow Salvatore to identify
                  changes, patterns, and possible increases in
                  distress over time.
                </p>
              </div>

              <Link
                to="/checkin"
                className="journey-checkin-btn"
              >
                <Plus size={19} />
                New check-in
              </Link>
            </section>

            <section className="journey-empty">
              <div className="empty-icon">
                <Activity size={40} />
              </div>

              <h2>No monitoring data yet.</h2>

              <p>
                Complete your first check-in to begin building your
                dynamic distress timeline.
              </p>

              <Link
                to="/checkin"
                className="primary-btn"
              >
                Start first check-in
              </Link>
            </section>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="journey-page">
        <div className="journey-container">

          <Link to="/" className="back-home-btn">
            <ArrowLeft size={18} />
            Back home
          </Link>

          {/* HEADER */}

          <section className="journey-header">
            <div>
              <div className="journey-label">
                <Brain size={16} />
                DYNAMIC DISTRESS MONITORING
              </div>

              <h1>Your distress pattern over time.</h1>

              <p>
                Salvatore analyses repeated check-ins to identify
                worsening patterns, persistent distress, and
                possible early warning signals.
              </p>
            </div>

            <Link
              to="/checkin"
              className="journey-checkin-btn"
            >
              <Plus size={19} />
              New check-in
            </Link>
          </section>

          {/* SUMMARY CARDS */}

          <section className="journey-summary">

            <div className="journey-stat stat-blue">
              <CalendarDays size={24} />

              <div>
                <span>Total check-ins</span>
                <strong>{history.length}</strong>
              </div>
            </div>

            <div className="journey-stat stat-pink">
              <Activity size={24} />

              <div>
                <span>Current distress score</span>
                <strong>
                  {latestEntry.score}/100
                </strong>
              </div>
            </div>

            <div className="journey-stat stat-green">
              {trendData.trendType === "up" ? (
                <TrendingUp size={24} />
              ) : trendData.trendType === "down" ? (
                <TrendingDown size={24} />
              ) : (
                <Minus size={24} />
              )}

              <div>
                <span>Current trend</span>
                <strong>{trendData.trend}</strong>
              </div>
            </div>

          </section>

          {/* DISTRESS TIMELINE */}

          <section className="journey-chart-card">

            <div className="journey-section-heading">
              <div>
                <span>DYNAMIC DISTRESS TIMELINE</span>
                <h2>Longitudinal distress trend</h2>
              </div>

              <TrendingUp size={28} />
            </div>

            <div className="chart-wrapper">
              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <LineChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: -15,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#253047"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="chart-note">
              Higher scores indicate stronger distress signals.
              The trend is analysed across multiple check-ins
              instead of relying on a single response.
            </p>

          </section>

          {/* AI PREDICTION */}

          <section
            className={`prediction-card ${prediction.type}`}
          >
            <div className="prediction-icon">
              <Brain size={30} />
            </div>

            <div>
              <span>PREDICTIVE RISK INSIGHT</span>

              <h2>
                What the recent pattern suggests
              </h2>

              <p>{prediction.text}</p>
            </div>
          </section>

          {/* PERSISTENT DISTRESS */}

          <section className="persistent-distress-card">

            <div className="persistent-icon">
              <Clock3 size={30} />
            </div>

            <div className="persistent-content">
              <span>CONTINUOUS MONITORING</span>

              <h2>
                {persistentDistress.level}
              </h2>

              <p>
                Consecutive check-ins showing moderate or high
                distress:{" "}
                <strong>
                  {persistentDistress.count}
                </strong>
              </p>
            </div>

            {persistentDistress.escalated ? (
              <AlertTriangle
                size={32}
                className="persistent-alert"
              />
            ) : (
              <CheckCircle2
                size={32}
                className="persistent-safe"
              />
            )}

          </section>

          {/* PRIVACY + ESCALATION */}

          <section
            className={`escalation-card ${escalationStatus.status}`}
          >
            <div className="escalation-icon">
              {persistentDistress.escalated ? (
                <ShieldAlert size={30} />
              ) : (
                <LockKeyhole size={30} />
              )}
            </div>

            <div>
              <span>
                PRIVACY & ESCALATION PROTOCOL
              </span>

              <h2>
                {escalationStatus.title}
              </h2>

              <p>
                {escalationStatus.description}
              </p>
            </div>
          </section>

          {/* EXPLAINABLE AI */}

          <section className="journey-history">

            <div className="journey-section-heading">
              <div>
                <span>EXPLAINABLE MONITORING LOG</span>
                <h2>Why the system detected this pattern</h2>
              </div>

              <Sparkles size={26} />
            </div>

            <div className="history-list">

              {[...history]
                .reverse()
                .map((entry) => (
                  <div
                    className="history-item"
                    key={entry.id}
                  >

                    <div className="history-date">

                      <div className="history-date-icon">
                        <CalendarDays size={20} />
                      </div>

                      <div>
                        <strong>
                          {new Date(
                            entry.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </strong>

                        <span>
                          {entry.indicators?.length > 0
                            ? entry.indicators.join(", ")
                            : "No major indicators detected"}
                        </span>
                      </div>

                    </div>

                    <div className="history-result">

                      <div
                        className={`history-status ${
                          entry.riskColor
                        }`}
                      >
                        {entry.riskLevel}
                      </div>

                      <strong>
                        {entry.score}/100
                      </strong>

                    </div>

                  </div>
                ))}

            </div>

          </section>

          <p className="medical-note">
            Salvatore is a continuous distress monitoring and
            early-support system. It identifies patterns and
            possible risk signals over time and does not provide
            a medical or psychological diagnosis.
          </p>

        </div>
      </main>
    </>
  );
}

export default History;