import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PersonAdd,
  Close,
  AlternateEmail,
  MailOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { registerUser } from "../utils/requests.auth";

export default function RegisterDialog() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleRegister = async () => {
    if (passwordsMismatch) return;

    setLoading(true);
    setUsernameError("");
    setEmailError("");

    try {
      await registerUser(username, email, password);

      navigate("/login");
    } catch (err: any) {
      const status = err.status;
      const data = err.data;

      if (status === 409) {
        if (data.field === "username") {
          setUsernameError("Username already exists");
        }

        if (data.field === "email") {
          setEmailError("Email already exists");
        }
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl md:rounded-2xl">
        {/* Header */}
        <div className="border-b border-gray-100 px-6 pt-8 pb-6 text-center">
          <div className="mb-3 flex justify-center text-emerald-500">
            <PersonAdd sx={{ fontSize: 42 }} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            Create account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Save your records and compete on the leaderboard
          </p>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-6 *:text-left">
          {/* Username */}
          <div>
            <label className="mb-2 block text-sm text-gray-600">
              Username
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 px-3">
              <AlternateEmail className="text-gray-400" fontSize="small" />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-transparent p-3 focus:outline-none"
              />
            </div>

            {usernameError && (
              <p className="mt-1 text-sm text-red-500">
                {usernameError}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-600">
              Email
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 px-3">
              <MailOutline className="text-gray-400" fontSize="small" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full bg-transparent p-3 focus:outline-none"
              />
            </div>

            {emailError && (
              <p className="mt-1 text-sm text-red-500">
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-600">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 px-3">
              <LockOutlined className="text-gray-400" fontSize="small" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent p-3 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-600">
              Confirm Password
            </label>

            <div
              className={`flex items-center rounded-xl border px-3 transition ${
                passwordsMismatch ? "border-red-400" : "border-gray-200"
              }`}
            >
              <LockOutlined className="text-gray-400" fontSize="small" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-transparent p-3 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                {showConfirmPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            </div>

            {passwordsMismatch && (
              <p className="mt-1 text-sm text-red-500">
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleRegister}
            disabled={loading || passwordsMismatch}
            className={`
              w-full
              rounded-xl
              py-3
              font-medium
              text-white
              transition
              cursor-pointer
              ${
                loading || passwordsMismatch
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }
            `}
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?
            <button
              className="ml-1 text-emerald-600 hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>

          {/* Close button */}
          <button
            title="Close"
            className="
              absolute
              top-5
              right-5
              flex
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              text-gray-500
              transition
              hover:text-red-500
            "
            onClick={() => navigate("/")}
          >
            <Close fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
}