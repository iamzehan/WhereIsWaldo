import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Close,
  MailOutline,
  LockOutlined,
  Login,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useAuth } from "../utils/hooks";

export default function LoginDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await login({email, password});
      navigate("/");
    } catch (err: any) {
      const status = err.status;
      const data = err.data;

      if (status === 401) {
        setError("Invalid email or password");
      } else if (status === 404) {
        setError("User not found");
      } else {
        setError(data?.message || "Something went wrong");
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
            <Login sx={{ fontSize: 42 }} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            Login
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Continue your progress and compete on the leaderboard
          </p>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-6 *:text-left">
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
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-emerald-600
              py-3
              font-medium
              text-white
              transition
              hover:bg-emerald-700
              cursor-pointer
              disabled:opacity-50
            "
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Don’t have an account?
            <button
              className="ml-1 text-emerald-600 hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign up
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