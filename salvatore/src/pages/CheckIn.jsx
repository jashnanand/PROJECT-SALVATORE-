import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  PenLine,
  ClipboardList,
} from "lucide-react";

import Navbar from "../components/Navbar";

function CheckIn() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [mood, setMood] = useState(null);

  const [answers, setAnswers] = useState({
    stress: null,
    sleep: null,
    concentration: null,
    overwhelmed: null,
    safety: null,
    legalStress: null,
    financialStress: null,
    support: null,
  });

  const [journal, setJournal] = useState("");

  const moods = [
    { emoji: "😄", label: "Great", value: 1 },
    { emoji: "🙂", label: "Good", value: 2 },
    { emoji: "😐", label: "Okay", value: 3 },
    { emoji: "😔", label: "Low", value: 4 },
    { emoji: "😫", label: "Very Distressed", value: 5 },
  ];

  const questions = [
    {
      id: "stress",
      question: "How stressed have you felt recently?",
    },
    {
      id: "sleep",
      question: "How often have you had difficulty sleeping?",
    },
    {
      id: "concentration",
      question: "How often have you struggled to concentrate?",
    },
    {
      id: "overwhelmed",
      question: "How often have you felt emotionally overwhelmed?",
    },
    {
      id: "safety",
      question: "How unsafe or threatened have you felt recently?",
    },
    {
      id: "legalStress",
      question:
        "How much stress have ongoing legal or case-related processes caused you?",
    },
    {
      id: "financialStress",
      question:
        "How much are financial, rehabilitation, or daily-life difficulties affecting you?",
    },
    {
      id: "support",
      question:
        "How difficult has it been to access the support you currently need?",
    },
  ];

  const options = [
    "Not at all",
    "A little",
    "Sometimes",
    "Often",
    "Almost always",
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  // Calculate Dynamic Distress Score
  const calculateDistressScore = () => {
    const answerValues = Object.values(answers);

    const answerTotal = answerValues.reduce(
      (total, value) => total + value,
      0
    );

    const moodScore = mood ? mood.value * 2 : 0;

    const maximumScore =
      questions.length * 5 + 10;

    const totalScore =
      answerTotal + moodScore;

    return Math.round(
      (totalScore / maximumScore) * 100
    );
  };

  const getRiskLevel = (score) => {
    if (score >= 75) {
      return "High";
    }

    if (score >= 50) {
      return "Moderate";
    }

    return "Low";
  };

  const nextStep = () => {
    if (step === 1 && !mood) {
      alert("Please select how you're feeling today.");
      return;
    }

    if (
      step === 2 &&
      Object.values(answers).some(
        (answer) => answer === null
      )
    ) {
      alert("Please answer all the questions.");
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      const distressScore =
        calculateDistressScore();

      const riskLevel =
        getRiskLevel(distressScore);

      const checkInData = {
        mood,
        answers,
        journal,

        distressScore,
        riskLevel,

        date: new Date().toISOString(),
      };

      // Save current check-in
      localStorage.setItem(
        "salvatoreCurrentCheckIn",
        JSON.stringify(checkInData)
      );

      // Save history
      const existingHistory = JSON.parse(
        localStorage.getItem("salvatoreCheckInHistory")
      ) || [];

      existingHistory.push(checkInData);

      localStorage.setItem(
        "salvatoreCheckInHistory",
        JSON.stringify(existingHistory)
      );

      navigate("/results");
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <Navbar />

      <main className="checkin-page">
        <div className="checkin-container">

          <button
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back home
          </button>

          <div className="progress-wrapper">
            <div className="progress-top">
              <span>Well-being check-in</span>

              <span>
                Step {step} of 3
              </span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${(step / 3) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* STEP 1 - MOOD */}

          {step === 1 && (
            <section className="checkin-card mood-step">

              <div className="checkin-icon yellow-icon">
                <Sparkles size={28} />
              </div>

              <h1>
                How are you feeling today?
              </h1>

              <p>
                Choose the option that best describes
                your current emotional state.
              </p>

              <div className="mood-options">
                {moods.map((item) => (
                  <button
                    key={item.value}
                    className={`mood-option ${
                      mood?.value === item.value
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => setMood(item)}
                  >
                    <span>
                      {item.emoji}
                    </span>

                    <small>
                      {item.label}
                    </small>
                  </button>
                ))}
              </div>

            </section>
          )}

          {/* STEP 2 - QUESTIONS */}

          {step === 2 && (
            <section className="checkin-card questions-step">

              <div className="checkin-icon blue-icon">
                <ClipboardList size={28} />
              </div>

              <h1>
                A few questions about your well-being
              </h1>

              <p>
                Your responses help identify changes
                in your well-being and support needs.
              </p>

              <div className="questions-list">

                {questions.map((item, index) => (
                  <div
                    className="question-item"
                    key={item.id}
                  >
                    <h3>
                      <span>
                        {index + 1}
                      </span>

                      {item.question}
                    </h3>

                    <div className="answer-options">

                      {options.map(
                        (option, optionIndex) => (
                          <button
                            key={option}
                            className={
                              answers[item.id] ===
                              optionIndex + 1
                                ? "answer-selected"
                                : ""
                            }
                            onClick={() =>
                              handleAnswer(
                                item.id,
                                optionIndex + 1
                              )
                            }
                          >
                            {option}
                          </button>
                        )
                      )}

                    </div>

                  </div>
                ))}

              </div>

            </section>
          )}

          {/* STEP 3 - JOURNAL */}

          {step === 3 && (
            <section className="checkin-card journal-step">

              <div className="checkin-icon pink-icon">
                <PenLine size={28} />
              </div>

              <h1>
                Is there anything else you'd like to share?
              </h1>

              <p>
                You can write about your feelings,
                concerns, difficulties, or anything
                that has affected your well-being.
              </p>

              <textarea
                value={journal}
                onChange={(e) =>
                  setJournal(e.target.value)
                }
                placeholder="I would like to share..."
                maxLength="1000"
              />

              <div className="journal-bottom">
                <span>
                  {journal.length}/1000 characters
                </span>

                <span>
                  Take your time 💛
                </span>
              </div>

            </section>
          )}

          {/* NAVIGATION */}

          <div className="checkin-navigation">

            <button
              className="previous-btn"
              onClick={previousStep}
              disabled={step === 1}
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            <button
              className="next-btn"
              onClick={nextStep}
            >
              {step === 3 ? (
                <>
                  Complete Check-in
                  <Check size={18} />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </div>

        </div>
      </main>
    </>
  );
}

export default CheckIn;