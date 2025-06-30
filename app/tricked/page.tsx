"use client"

import { useEffect, useState } from "react"

export default function TrickedPage() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Add a small delay for dramatic effect
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-orange-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {showMessage && (
          <div className="animate-fade-in">
            <div className="text-8xl mb-8">😈</div>
            <h1 className="text-6xl font-bold text-white mb-6 animate-pulse">GOTCHA!</h1>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
              <h2 className="text-3xl font-semibold text-white mb-4">You have been tricked</h2>
              <p className="text-xl text-red-200 mb-6">This wasn't the real Keka login page!</p>
              <p className="text-lg text-red-300 mb-8">Don't report this - it's just a harmless prank! 🎭</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={() => (window.location.href = "https://app.keka.com/Account/Login")}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                >
                  Real Keka Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  )
} 