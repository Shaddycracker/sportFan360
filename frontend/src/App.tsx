import { MatchProvider } from "./lib/MatchContext";
import { InputComponent } from "./components/InputComponent";
import { OutputComponent } from "./components/OutputComponent";

export default function Home() {
  return (
    <MatchProvider>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Fan Insight Generator
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Cricket Match Analysis & Win Probability Predictor
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="flex flex-col">
              <InputComponent />
            </div>

            {/* Output Section */}
            <div className="flex flex-col">
              <OutputComponent />
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Smart Analysis
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Get instant AI-style analysis of cricket match scenarios with
                strategic recommendations.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Probability Prediction
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Accurate win probability calculations based on cricket-specific
                factors and match dynamics.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Easy to Use
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Simply describe your match scenario and get instant insights in
                a clear, easy-to-read format.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>Fan Insight Generator • Cricket Match Analysis Tool</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              Powered by intelligent match analysis algorithms
            </p>
          </div>
        </footer>
      </main>
    </MatchProvider>
  );
}
