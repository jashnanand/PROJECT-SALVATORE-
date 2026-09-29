import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Wind,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";

function Breathe() {
  const phases = [
    {
      name: "Breathe In",
      duration: 4,
      instruction: "Slowly breathe in through your nose.",
      animation: "inhale",
    },
    {
      name: "Hold",
      duration: 4,
      instruction: "Hold your breath gently.",
      animation: "hold",
    },
    {
      name: "Breathe Out",
      duration: 6,
      instruction: "Slowly breathe out and relax.",
      animation: "exhale",
    },
  ];

  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

  const currentPhase =
    phaseIndex === -1 ? null : phases[phaseIndex];

  useEffect(() => {
    if (!isRunning || !currentPhase) return;

    if (timeLeft === 0) {
      if (phaseIndex === phases.length - 1) {
        setCompletedCycles((prev) => prev + 1);
        setPhaseIndex(0);
        setTimeLeft(phases[0].duration);
      } else {
        const nextPhase = phaseIndex + 1;
        setPhaseIndex(nextPhase);
        setTimeLeft(phases[nextPhase].duration);
      }

      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, phaseIndex, currentPhase]);

  const handleStart = () => {
    if (phaseIndex === -1) {
      setPhaseIndex(0);
      setTimeLeft(phases[0].duration);
    }

    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setPhaseIndex(-1);
    setTimeLeft(0);
    setCompletedCycles(0);
  };

  return (
    <>
      <Navbar />

      <main className="breathe-page">
        <div className="breathe-container">

          <Link to="/support" className="back-home-btn">
            <ArrowLeft size={18} />
            Back to support
          </Link>

          {/* HEADER */}

          <section className="breathe-header">
            <div className="breathe-label">
              <Wind size={17} />
              GUIDED BREATHING
            </div>

            <h1>Take a moment for yourself.</h1>

            <p>
              Follow the circle and breathe slowly. There is no need to force
              anything — simply follow the rhythm at your own comfort level.
            </p>
          </section>

          {/* BREATHING AREA */}

          <section className="breathing-session">

            <div className="session-info">
              <span>GUIDED SESSION</span>

              <div className="cycle-counter">
                <Sparkles size={17} />
                {completedCycles} cycle
                {completedCycles !== 1 ? "s" : ""} completed
              </div>
            </div>

            <div className="breathing-stage">

              <div
                className={`breathing-circle ${
                  currentPhase
                    ? `circle-${currentPhase.animation}`
                    : ""
                } ${isRunning ? "circle-running" : ""}`}
              >
                <div className="circle-inner">
                  <span className="phase-name">
                    {currentPhase
                      ? currentPhase.name
                      : "Ready?"}
                  </span>

                  <strong>
                    {currentPhase ? timeLeft : "🫁"}
                  </strong>
                </div>
              </div>

              <div className="breathing-instruction">
                {currentPhase
                  ? currentPhase.instruction
                  : "Press start when you're ready to begin."}
              </div>

            </div>

            {/* CONTROLS */}

            <div className="breathing-controls">

              {!isRunning ? (
                <button
                  className="breathe-main-btn"
                  onClick={handleStart}
                >
                  <Play size={19} fill="currentColor" />
                  {phaseIndex === -1
                    ? "Start breathing"
                    : "Resume"}
                </button>
              ) : (
                <button
                  className="breathe-main-btn"
                  onClick={handlePause}
                >
                  <Pause size={19} fill="currentColor" />
                  Pause
                </button>
              )}

              <button
                className="restart-btn"
                onClick={handleRestart}
                title="Restart session"
              >
                <RotateCcw size={20} />
              </button>

            </div>

          </section>

          {/* HOW IT WORKS */}

          <section className="breathing-guide">

            <div className="guide-heading">
              <span>THE RHYTHM</span>
              <h2>Follow these three simple steps</h2>
            </div>

            <div className="guide-grid">

              <div className="guide-card guide-yellow">
                <span>01</span>
                <h3>Breathe In</h3>
                <strong>4 seconds</strong>
                <p>Take a slow, comfortable breath in.</p>
              </div>

              <div className="guide-card guide-blue">
                <span>02</span>
                <h3>Hold</h3>
                <strong>4 seconds</strong>
                <p>Pause gently without straining yourself.</p>
              </div>

              <div className="guide-card guide-pink">
                <span>03</span>
                <h3>Breathe Out</h3>
                <strong>6 seconds</strong>
                <p>Release your breath slowly and relax.</p>
              </div>

            </div>

          </section>

        </div>
      </main>
    </>
  );
}

export default Breathe;