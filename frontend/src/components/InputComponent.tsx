"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { useMatch } from "../lib/MatchContext";
import { Spinner } from "./ui/spinner";

const EXAMPLE_SCENARIOS = [
    "India needs 20 runs in 6 balls, 2 wickets left",
    "Australia requires 45 runs in 18 balls with 4 wickets remaining",
    "Pakistan chasing 15 runs in 12 balls, 3 wickets in hand",
];

export function InputComponent() {
    const { scenario, setScenario, analyzeScenario, loading, reset } =
        useMatch();
    const [localInput, setLocalInput] = useState("");

    const handleAnalyze = () => {
        if (localInput.trim()) {
            analyzeScenario(localInput);
        }
    };

    const handleReset = () => {
        setLocalInput("");
        reset();
    };

    const handleQuickExample = (example: string) => {
        setLocalInput(example);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            handleAnalyze();
        }
    };

    return (
        <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-2 border-blue-200 dark:border-slate-700">
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Match Scenario Input
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Describe a cricket match situation to get AI-style analysis
                    </p>
                </div>

                <div className="space-y-3">
                    <Textarea
                        value={localInput}
                        onChange={(e) => setLocalInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter match scenario (e.g., 'India needs 20 runs in 6 balls, 2 wickets left')"
                        className="min-h-24 resize-none bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400"
                        disabled={loading}
                    />

                    <div className="flex gap-2 flex-wrap">
                        <Button
                            onClick={handleAnalyze}
                            disabled={!localInput.trim() || loading}
                            className="flex-1 min-w-24 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {loading ? (
                                <>
                                    <Spinner className="w-4 h-4 mr-2" />
                                    Analyzing...
                                </>
                            ) : (
                                "Analyze"
                            )}
                        </Button>
                        <Button
                            onClick={handleReset}
                            variant="outline"
                            disabled={loading}
                            className="flex-1 min-w-24"
                        >
                            Reset
                        </Button>
                    </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                        Quick Examples:
                    </p>
                    <div className="flex flex-col gap-2">
                        {EXAMPLE_SCENARIOS.map((example, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleQuickExample(example)}
                                disabled={loading}
                                className="text-left text-sm px-3 py-2 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
