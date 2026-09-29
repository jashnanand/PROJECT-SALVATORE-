function analyzeWellness(checkInData) {
  const { mood, answers, journal } = checkInData;

  // =========================
  // 1. MOOD SCORE
  // =========================

  const moodScore = ((mood.value - 1) / 4) * 100;

  // =========================
  // 2. QUESTIONNAIRE SCORE
  // =========================

  const answerValues = Object.values(answers);

  const totalAnswers = answerValues.reduce(
    (sum, value) => sum + value,
    0
  );

  const maxPossibleScore = answerValues.length * 5;

  const questionnaireScore =
    ((totalAnswers - answerValues.length) /
      (maxPossibleScore - answerValues.length)) *
    100;

  // =========================
  // 3. JOURNAL TEXT ANALYSIS
  // =========================

  const negativeKeywords = [
    "stress",
    "stressed",
    "anxious",
    "anxiety",
    "worried",
    "worry",
    "overwhelmed",
    "sad",
    "depressed",
    "depression",
    "lonely",
    "alone",
    "tired",
    "exhausted",
    "sleep",
    "insomnia",
    "pressure",
    "scared",
    "afraid",
    "hopeless",
    "worthless",
    "cry",
    "crying",
    "panic",
    "failure",
    "failing",
    "can't focus",
    "cannot focus",
    "no motivation",
  ];

  const positiveKeywords = [
    "happy",
    "good",
    "great",
    "excited",
    "calm",
    "relaxed",
    "motivated",
    "productive",
    "confident",
    "hopeful",
    "better",
    "peaceful",
    "enjoyed",
  ];

  const lowerJournal = journal.toLowerCase();

  const detectedNegative = negativeKeywords.filter((keyword) =>
    lowerJournal.includes(keyword)
  );

  const detectedPositive = positiveKeywords.filter((keyword) =>
    lowerJournal.includes(keyword)
  );

  let textScore = 0;

  detectedNegative.forEach(() => {
    textScore += 12;
  });

  detectedPositive.forEach(() => {
    textScore -= 6;
  });

  textScore = Math.max(0, Math.min(100, textScore));

  // =========================
  // 4. CURRENT DISTRESS SCORE
  // =========================

  const finalScore =
    moodScore * 0.3 +
    questionnaireScore * 0.5 +
    textScore * 0.2;

  const roundedScore = Math.round(finalScore);

  // =========================
  // 5. CURRENT RISK LEVEL
  // =========================

  let riskLevel;
  let riskColor;

  if (roundedScore < 35) {
    riskLevel = "Low";
    riskColor = "green";
  } else if (roundedScore < 65) {
    riskLevel = "Moderate";
    riskColor = "yellow";
  } else {
    riskLevel = "High";
    riskColor = "red";
  }

  // =========================
  // 6. DETECTED INDICATORS
  // =========================

  const indicators = [];

  if (answers.stress >= 4) {
    indicators.push("High stress levels detected");
  }

  if (answers.sleep >= 4) {
    indicators.push("Sleep difficulty detected");
  }

  if (answers.concentration >= 4) {
    indicators.push("Difficulty concentrating");
  }

  if (answers.overwhelmed >= 4) {
    indicators.push("Feeling overwhelmed");
  }

  if (answers.social >= 4) {
    indicators.push("Feeling socially disconnected");
  }

  if (detectedNegative.length > 0) {
    indicators.push("Negative emotional language detected");
  }

  if (indicators.length === 0) {
    indicators.push("No major distress indicators detected");
  }

  // =========================
  // 7. LONGITUDINAL ANALYSIS
  // Compare with previous check-ins
  // =========================

  const history = JSON.parse(
    localStorage.getItem("salvatoreHistory") || "[]"
  );

  // Get previous check-ins only
  const previousScores = history
    .map((entry) => entry.score)
    .filter(
      (score) =>
        typeof score === "number" &&
        !isNaN(score)
    );

  let trend = "Stable";
  let trendMessage =
    "Not enough previous check-ins to identify a clear pattern.";

  let prediction = "Continue regular monitoring";

  // If at least 2 previous check-ins exist
  if (previousScores.length >= 2) {
    const recentScores = previousScores.slice(-3);

    const averagePreviousScore =
      recentScores.reduce(
        (sum, score) => sum + score,
        0
      ) / recentScores.length;

    const difference =
      roundedScore - averagePreviousScore;

    // Increasing distress
    if (difference >= 10) {
      trend = "Increasing";

      trendMessage =
        "Your distress score is higher than your recent check-ins.";

      prediction =
        "If this pattern continues, your distress level may increase further.";
    }

    // Decreasing distress
    else if (difference <= -10) {
      trend = "Improving";

      trendMessage =
        "Your distress score is lower than your recent check-ins.";

      prediction =
        "Your recent pattern shows signs of improvement.";
    }

    // Stable
    else {
      trend = "Stable";

      trendMessage =
        "Your distress level is relatively consistent with your recent check-ins.";

      prediction =
        "Continue monitoring to identify any future changes.";
    }
  }

  // =========================
  // 8. PERSISTENT HIGH DISTRESS
  // =========================

  const recentHistory = history.slice(-5);

  const highRiskCount = recentHistory.filter(
    (entry) =>
      entry.riskLevel === "High" ||
      entry.score >= 65
  ).length;

  let escalationRequired = false;
  let escalationMessage = "";

  // Current high risk + repeated high distress
  if (
    roundedScore >= 65 &&
    highRiskCount >= 2
  ) {
    escalationRequired = true;

    escalationMessage =
      "Repeated high distress has been detected across multiple check-ins. Follow-up support may be required.";
  }

  // Sudden increase
  if (
    previousScores.length > 0 &&
    roundedScore -
      previousScores[previousScores.length - 1] >=
      25
  ) {
    escalationRequired = true;

    escalationMessage =
      "A significant increase in distress has been detected compared with the previous check-in.";
  }

  // =========================
  // RETURN COMPLETE ANALYSIS
  // =========================

  return {
    score: roundedScore,

    moodScore: Math.round(moodScore),

    questionnaireScore:
      Math.round(questionnaireScore),

    textScore: Math.round(textScore),

    riskLevel,

    riskColor,

    indicators,

    detectedNegative,

    detectedPositive,

    // NEW LONGITUDINAL DATA

    trend,

    trendMessage,

    prediction,

    previousScores,

    escalationRequired,

    escalationMessage,
  };
}

export default analyzeWellness;