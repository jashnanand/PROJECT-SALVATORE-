import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  TrendingUp,
  ClipboardList,
  MessageSquareText,
  ShieldAlert,
  Brain,
  Activity,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import analyzeWellness from "../utils/analyzeWellness";

function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem(
      "salvatoreCurrentCheckIn"
    );

    if (!savedData) {
      navigate("/checkin");
      return;
    }

    const checkInData = JSON.parse(savedData);

    // Analyze current check-in
    const analysis = analyzeWellness(checkInData);

    const updatedResult = {
      ...analysis,
      checkInData,
    };

    setResult(updatedResult);

    // =========================
    // SAVE TO HISTORY
    // =========================

    const previousHistory = JSON.parse(
      localStorage.getItem("salvatoreHistory") || "[]"
    );

    const newEntry = {
      ...checkInData,
      ...updatedResult,
      id: Date.now(),
    };

    // Prevent duplicate saving on refresh
    const alreadySaved = previousHistory.some(
      (entry) => entry.date === checkInData.date
    );

    if (!alreadySaved) {
      localStorage.setItem(
        "salvatoreHistory",
        JSON.stringify([
          ...previousHistory,
          newEntry,
        ])
      );
    }
  }, [navigate]);

  if (!result) {
    return null;
  }

  // =========================
  // RESULT MESSAGE
  // =========================

  const isLow = result.riskLevel === "Low";
  const isModerate =
    result.riskLevel === "Moderate";

  let title;
  let description;
  let icon;

  if (isLow) {
    title = "Your current distress level is low";

    description =
      "Your recent responses do not currently show strong distress indicators. Continue regular check-ins so changes can be noticed over time.";

    icon = <CheckCircle2 size={34} />;
  } else if (isModerate) {
    title = "Some areas may need attention";

    description =
      "Your responses show moderate distress indicators. Regular monitoring and appropriate support may help prevent the situation from becoming more difficult.";

    icon = <Heart size={34} />;
  } else {
    title = "Your well-being may need attention";

    description =
      "Your responses show significant distress indicators. Your situation may benefit from additional support and follow-up.";

    icon = <ShieldAlert size={34} />;
  }

  // =========================
  // TREND ICON / TEXT
  // =========================

  let trendIcon;
  let trendClass;

  if (result.trend === "Increasing") {
    trendIcon = "📈";
    trendClass = "trend-increasing";
  } else if (result.trend === "Improving") {
    trendIcon = "📉";
    trendClass = "trend-improving";
  } else {
    trendIcon = "➡️";
    trendClass = "trend-stable";
  }

  return (
    <>
      <Navbar />

      <main className="results-page">
        <div className="results-container">

          <Link
            to="/checkin"
            className="back-home-btn"
          >
            <ArrowLeft size={18} />
            New check-in
          </Link>

          {/* =========================
              MAIN DISTRESS RESULT
          ========================= */}

          <section
            className={`result-hero ${result.riskColor}`}
          >
            <div className="result-icon">
              {icon}
            </div>

            <div className="result-main-content">
              <span>
                DYNAMIC DISTRESS ANALYSIS
              </span>

              <h1>{title}</h1>

              <p>{description}</p>
            </div>

            <div className="score-circle">
              <strong>{result.score}</strong>

              <span>/100</span>

              <small>
                {result.riskLevel} Risk
              </small>
            </div>
          </section>

          {/* =========================
              EXPLAINABLE AI
          ========================= */}

          <section className="results-section">

            <div className="results-section-heading">
              <div>
                <span>
                  EXPLAINABLE AI INSIGHT
                </span>

                <h2>
                  How your distress score was formed
                </h2>
              </div>

              <Brain size={28} />
            </div>

            <div className="signal-grid">

              {/* Mood */}

              <div className="signal-card mood-signal">

                <div className="signal-top">
                  <Heart size={21} />
                  <span>Emotional State</span>
                </div>

                <strong>
                  {result.moodScore ?? 0}%
                </strong>

                <div className="mini-progress">
                  <div
                    style={{
                      width: `${result.moodScore ?? 0}%`,
                    }}
                  ></div>
                </div>

              </div>

              {/* Questionnaire */}

              <div className="signal-card question-signal">

                <div className="signal-top">
                  <ClipboardList size={21} />
                  <span>Distress Responses</span>
                </div>

                <strong>
                  {result.questionnaireScore ?? 0}%
                </strong>

                <div className="mini-progress">
                  <div
                    style={{
                      width: `${result.questionnaireScore ?? 0}%`,
                    }}
                  ></div>
                </div>

              </div>

              {/* Journal */}

              <div className="signal-card text-signal">

                <div className="signal-top">
                  <MessageSquareText size={21} />
                  <span>Written Response</span>
                </div>

                <strong>
                  {result.textScore ?? 0}%
                </strong>

                <div className="mini-progress">
                  <div
                    style={{
                      width: `${result.textScore ?? 0}%`,
                    }}
                  ></div>
                </div>

              </div>

            </div>
          </section>

          {/* =========================
              NEW: DISTRESS TREND
          ========================= */}

          <section className="results-section trend-section">

            <div className="results-section-heading">
              <div>
                <span>
                  LONGITUDINAL MONITORING
                </span>

                <h2>
                  Your distress trend
                </h2>
              </div>

              <TrendingUp size={28} />
            </div>

            <div className={`trend-card ${trendClass}`}>

              <div className="trend-icon">
                {trendIcon}
              </div>

              <div className="trend-content">

                <span>
                  CURRENT PATTERN
                </span>

                <h3>
                  {result.trend}
                </h3>

                <p>
                  {result.trendMessage}
                </p>

              </div>

            </div>

          </section>

          {/* =========================
              NEW: EARLY PREDICTION
          ========================= */}

          <section className="results-section prediction-section">

            <div className="results-section-heading">

              <div>
                <span>
                  EARLY RISK PREDICTION
                </span>

                <h2>
                  What the system predicts
                </h2>
              </div>

              <Activity size={28} />

            </div>

            <div className="prediction-card">

              <div className="prediction-icon">
                <Sparkles size={28} />
              </div>

              <div>
                <h3>
                  Pattern-based prediction
                </h3>

                <p>
                  {result.prediction}
                </p>
              </div>

            </div>

          </section>

          {/* =========================
              NEW: ESCALATION ALERT
          ========================= */}

          {result.escalationRequired && (

            <section className="escalation-alert">

              <div className="escalation-icon">
                <AlertTriangle size={30} />
              </div>

              <div>

                <span>
                  ESCALATION SIGNAL DETECTED
                </span>

                <h2>
                  Continued monitoring and follow-up recommended
                </h2>

                <p>
                  {result.escalationMessage}
                </p>

              </div>

            </section>

          )}

          {/* =========================
              DETECTED INDICATORS
          ========================= */}

          <section className="results-section indicators-section">

            <div className="results-section-heading">

              <div>
                <span>
                  DETECTED DISTRESS INDICATORS
                </span>

                <h2>
                  What Salvatore noticed
                </h2>
              </div>

              <TrendingUp size={28} />

            </div>

            <div className="indicator-list">

              {result.indicators?.length > 0 ? (

                result.indicators.map(
                  (indicator, index) => (

                    <div
                      className="indicator-item"
                      key={index}
                    >

                      <span
                        className={`indicator-dot ${result.riskColor}`}
                      ></span>

                      {indicator}

                    </div>

                  )
                )

              ) : (

                <div className="indicator-item">

                  <span className="indicator-dot green"></span>

                  No major distress indicators were detected.

                </div>

              )}

            </div>

          </section>

          {/* =========================
              NEXT STEP
          ========================= */}

          <section className="next-steps">

            <div>

              <span>
                RECOMMENDED NEXT STEP
              </span>

              <h2>
                Your well-being is monitored over time.
              </h2>

              <p>
                Salvatore compares your check-ins over time to identify
                changes and possible distress escalation. Regular
                interactions help the system understand your pattern
                rather than relying on a single response.
              </p>

            </div>

            <div className="next-step-actions">

              <Link
                to="/history"
                className="secondary-btn"
              >
                View my journey
              </Link>

              <Link
                to="/checkin"
                className="primary-btn"
              >
                Check in again
              </Link>

            </div>

          </section>

          <p className="medical-note">
            Salvatore is an AI-assisted monitoring and early-support
            system. It identifies patterns and possible distress signals
            but does not replace professional medical or psychological
            diagnosis.
          </p>

        </div>
      </main>
    </>
  );
}

export default Results;