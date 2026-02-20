"use client";

import { Card } from "./ui/card";
import { useMatch } from "../lib/MatchContext";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

function getProbabilityColor(
  probability: number
): { bg: string; text: string; bar: string } {
  if (probability >= 70) {
    return {
      bg: "bg-green-50 dark:bg-green-950",
      text: "text-green-900 dark:text-green-100",
      bar: "bg-green-500",
    };
  } else if (probability >= 50) {
    return {
      bg: "bg-yellow-50 dark:bg-yellow-950",
      text: "text-yellow-900 dark:text-yellow-100",
      bar: "bg-yellow-500",
    };
  } else if (probability >= 30) {
    return {
      bg: "bg-orange-50 dark:bg-orange-950",
      text: "text-orange-900 dark:text-orange-100",
      bar: "bg-orange-500",
    };
  } else {
    return {
      bg: "bg-red-50 dark:bg-red-950",
      text: "text-red-900 dark:text-red-100",
      bar: "bg-red-500",
    };
  }
}

function getProbabilityAssessment(
  probability: number
): { label: string; description: string } {
  if (probability >= 70) {
    return {
      label: "Highly Favorable",
      description: "Strong position with high chances of success",
    };
  } else if (probability >= 50) {
    return {
      label: "Competitive",
      description: "Evenly matched situation - execution will decide",
    };
  } else if (probability >= 30) {
    return {
      label: "Challenging",
      description: "Difficult position requiring exceptional performance",
    };
  } else {
    return {
      label: "Critical",
      description: "Very challenging - success requires near-perfect play",
    };
  }
}

export function OutputComponent() {
  const { analysis, error, loading } = useMatch();

  if (loading) {
    return (
      <Card className="w-full bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700">
        <div className="p-8 flex flex-col items-center justify-center min-h-64">
          <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Analyzing match scenario...
          </p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700">
        <div className="p-6">
          <Alert variant="destructive" className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {error}
            </AlertDescription>
          </Alert>
          <div className="mt-4 p-4 bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Expected Format:
            </p>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
              <li>Runs needed (e.g., "20 runs", "needs 50")</li>
              <li>Balls remaining (e.g., "6 balls", "18 deliveries")</li>
              <li>Wickets left (e.g., "2 wickets", "3 wkts")</li>
            </ul>
          </div>
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="w-full bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 border-dashed">
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <TrendingUp className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Enter a match scenario to see analysis
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
            Use the input form above to describe the situation
          </p>
        </div>
      </Card>
    );
  }

  const colors = getProbabilityColor(analysis.winProbability);
  const assessment = getProbabilityAssessment(analysis.winProbability);

  return (
    <Card className="w-full bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700">
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Match Analysis
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {analysis.scenario}
          </p>
        </div>

        {/* Win Probability Section */}
        <div className={`p-6 rounded-lg ${colors.bg} border-2 border-current`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Win Probability
              </p>
              <p className={`text-4xl font-bold ${colors.text}`}>
                {analysis.winProbability}%
              </p>
            </div>
            <CheckCircle2 className={`w-16 h-16 ${colors.text} opacity-20`} />
          </div>

          {/* Probability Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`${colors.bar} h-full transition-all duration-500 ease-out`}
              style={{ width: `${analysis.winProbability}%` }}
            />
          </div>

          {/* Assessment */}
          <div className="mt-4 pt-4 border-t border-current border-opacity-20">
            <p className={`font-semibold ${colors.text}`}>
              {assessment.label}
            </p>
            <p className={`text-sm ${colors.text} opacity-90`}>
              {assessment.description}
            </p>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
            Detailed Analysis
          </h3>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
              {analysis.analysis}
            </p>
          </div>
        </div>

        {/* Key Factors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analysis.keyFactors.map((factor, idx) => (
            <div
              key={idx}
              className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3"
            >
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 flex-shrink-0" />
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {factor}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 rounded-lg p-4 border-l-4 border-indigo-600 dark:border-indigo-400">
          <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
            Recommendation
          </p>
          <p className="text-sm text-indigo-800 dark:text-indigo-200">
            {analysis.recommendation}
          </p>
        </div>
      </div>
    </Card>
  );
}
