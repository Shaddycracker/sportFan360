/**
 * Match Analysis Logic Module
 * Computes cricket match analysis and win probability based on scenario
 */

export interface MatchScenario {
  runsNeeded: number;
  ballsRemaining: number;
  wicketsRemaining: number;
  currentRunRate?: number;
  requiredRunRate?: number;
}

export interface AnalysisResult {
  scenario: string;
  analysis: string;
  winProbability: number;
  keyFactors: string[];
  recommendation: string;
}

/**
 * Extract numeric values from scenario text using keyword matching
 */
export function parseScenario(scenarioText: string): MatchScenario | null {
  const text = scenarioText.toLowerCase();

  // Match patterns like "20 runs" or "needs 20"
  const runsMatch = scenarioText.match(/(\d+)\s*(?:runs?|needed?)/i);
  const ballsMatch = scenarioText.match(/(\d+)\s*(?:balls?|deliveries?)/i);
  const wicketsMatch = scenarioText.match(/(\d+)\s*(?:wickets?|wkts?)/i);

  if (!runsMatch || !ballsMatch || !wicketsMatch) {
    return null;
  }

  const runsNeeded = parseInt(runsMatch[1], 10);
  const ballsRemaining = parseInt(ballsMatch[1], 10);
  const wicketsRemaining = parseInt(wicketsMatch[1], 10);

  const requiredRunRate = parseFloat(
    ((runsNeeded / ballsRemaining) * 6).toFixed(2)
  );

  return {
    runsNeeded,
    ballsRemaining,
    wicketsRemaining,
    requiredRunRate,
  };
}

/**
 * Calculate win probability based on cricket analysis
 * Uses keyword matching and simple heuristics (no real AI)
 */
export function calculateWinProbability(
  scenario: MatchScenario
): {
  probability: number;
  factors: { name: string; impact: number }[];
} {
  let probability = 50; // Start at neutral
  const factors: { name: string; impact: number }[] = [];

  // Factor 1: Required Run Rate
  const currentRunRate = 8; // Typical successful chase rate in T20
  const rrrDifference = scenario.requiredRunRate! - currentRunRate;

  if (rrrDifference <= 0) {
    probability += 25;
    factors.push({ name: "Low Required Run Rate", impact: 25 });
  } else if (rrrDifference <= 3) {
    probability += 15;
    factors.push({ name: "Moderate Required Run Rate", impact: 15 });
  } else if (rrrDifference <= 6) {
    probability -= 10;
    factors.push({ name: "High Required Run Rate", impact: -10 });
  } else {
    probability -= 25;
    factors.push({ name: "Very High Required Run Rate", impact: -25 });
  }

  // Factor 2: Balls Remaining
  if (scenario.ballsRemaining >= 36) {
    probability += 20;
    factors.push({ name: "Sufficient Balls Remaining", impact: 20 });
  } else if (scenario.ballsRemaining >= 18) {
    probability += 10;
    factors.push({ name: "Moderate Balls Remaining", impact: 10 });
  } else if (scenario.ballsRemaining <= 6) {
    probability -= 20;
    factors.push({ name: "Very Few Balls Remaining", impact: -20 });
  }

  // Factor 3: Wickets in Hand
  if (scenario.wicketsRemaining >= 5) {
    probability += 15;
    factors.push({ name: "Good Wickets Available", impact: 15 });
  } else if (scenario.wicketsRemaining >= 3) {
    probability += 5;
    factors.push({ name: "Limited Wickets Available", impact: 5 });
  } else if (scenario.wicketsRemaining <= 1) {
    probability -= 15;
    factors.push({ name: "Critical Wicket Situation", impact: -15 });
  }

  // Factor 4: Runs needed (momentum factor)
  if (scenario.runsNeeded <= 20) {
    probability += 10;
    factors.push({ name: "Small Target", impact: 10 });
  } else if (scenario.runsNeeded >= 50) {
    probability -= 10;
    factors.push({ name: "Large Target", impact: -10 });
  }

  // Clamp probability between 5 and 95
  probability = Math.max(5, Math.min(95, probability));

  return { probability, factors };
}

/**
 * Generate detailed match analysis
 */
export function generateAnalysis(scenario: MatchScenario): AnalysisResult {
  const { probability, factors } = calculateWinProbability(scenario);

  const requiredRunRate = scenario.requiredRunRate!.toFixed(2);
  const batsmenPerBall = (scenario.runsNeeded / scenario.ballsRemaining).toFixed(
    2
  );

  let analysis = `
    **Match Situation Analysis**
    
    Target: ${scenario.runsNeeded} runs in ${scenario.ballsRemaining} balls
    Wickets in Hand: ${scenario.wicketsRemaining}
    
    **Required Metrics:**
    - Required Run Rate: ${requiredRunRate} per over
    - Runs per Ball: ${batsmenPerBall}
    
    **Assessment:**
  `;

  if (probability >= 70) {
    analysis += `
      This is a strong position for the batting team. The required run rate is achievable with proper execution. 
      Focus on aggressive yet calculated batting, rotating strike, and taking calculated risks.
    `;
  } else if (probability >= 50) {
    analysis += `
      The match is competitive. Success depends on consistent execution and avoiding dot balls. 
      The team needs to balance aggression with stability and build partnerships.
    `;
  } else if (probability >= 30) {
    analysis += `
      This is a challenging position. The team needs exceptional performances and some luck to succeed. 
      Boundary-hitting and maintaining momentum will be crucial.
    `;
  } else {
    analysis += `
      This is an extremely difficult position. The required run rate is very high given the remaining resources.
      The team would need to play exceptionally well and hope for favorable circumstances.
    `;
  }

  const keyFactors = factors
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 3)
    .map((f) => f.name);

  let recommendation = "";
  if (probability >= 70) {
    recommendation =
      "Play positive cricket. Target boundaries while rotating strike and building partnerships.";
  } else if (probability >= 50) {
    recommendation =
      "Maintain composure. Focus on wicket preservation and strategic shot selection.";
  } else if (probability >= 30) {
    recommendation =
      "Go for aggressive batting. Take calculated risks and target specific bowlers.";
  } else {
    recommendation =
      "Play with intent. Only an exceptional performance can achieve this target.";
  }

  return {
    scenario: `${scenario.runsNeeded} runs needed in ${scenario.ballsRemaining} balls with ${scenario.wicketsRemaining} wickets remaining`,
    analysis: analysis.trim(),
    winProbability: probability,
    keyFactors,
    recommendation,
  };
}
