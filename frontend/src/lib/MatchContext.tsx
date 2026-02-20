"use client";

import React, { createContext, useContext, useState } from "react";
import {
  generateAnalysis,
  parseScenario
} from "./analyzeMatch";
import type { AnalysisResult} from "./analyzeMatch";

interface MatchContextType {
  scenario: string;
  setScenario: (scenario: string) => void;
  analysis: AnalysisResult | null;
  setAnalysis: (analysis: AnalysisResult | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  analyzeScenario: (scenarioText: string) => void;
  reset: () => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const [scenario, setScenario] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeScenario = (scenarioText: string) => {
    setLoading(true);
    setError(null);

    // Simulate API delay for better UX
    setTimeout(() => {
      try {
        const parsedScenario = parseScenario(scenarioText);

        if (!parsedScenario) {
          setError(
            "Could not parse scenario. Please include: runs needed, balls remaining, and wickets left (e.g., 'India needs 20 runs in 6 balls, 2 wickets left')"
          );
          setLoading(false);
          return;
        }

        const result = generateAnalysis(parsedScenario);
        setAnalysis(result);
        setError(null);
      } catch (err) {
        setError("An error occurred while analyzing the scenario.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 800); // Simulate processing delay
  };

  const reset = () => {
    setScenario("");
    setAnalysis(null);
    setError(null);
    setLoading(false);
  };

  return (
    <MatchContext.Provider
      value={{
        scenario,
        setScenario,
        analysis,
        setAnalysis,
        loading,
        setLoading,
        error,
        setError,
        analyzeScenario,
        reset,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export function useMatch() {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error("useMatch must be used within a MatchProvider");
  }
  return context;
}
