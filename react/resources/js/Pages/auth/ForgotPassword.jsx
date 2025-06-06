import { useState } from "react";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState(""); // phone or email
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enterIdentifier"); // enterIdentifier | verifyOtp | resetPassword

  const [serverOtp] = useState("123456"); // simulate server OTP
  const [otpError, setOtpError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();

    // Simulate server-side check
    const isValid = identifier.includes("@") || identifier.match(/^\d{10}$/);
    if (!isValid) {
      alert("Please enter a valid phone number or email.");
      return;
    }

    console.log("OTP sent to:", identifier);
    setStep("verifyOtp");
    setOtpError("");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp !== serverOtp) {
      setOtpError("Invalid OTP. Please try again.");
      return;
    }

    console.log("OTP verified.");
    setStep("resetPassword");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    console.log("Password reset successful:", password);
    alert("Your password has been changed successfully.");
    // Redirect or reset states if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>

        {step === "enterIdentifier" && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter your phone number or email
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email or phone"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === "verifyOtp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === "resetPassword" && (
          <form onSubmit={handleResetPassword} className="space-y-5 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;