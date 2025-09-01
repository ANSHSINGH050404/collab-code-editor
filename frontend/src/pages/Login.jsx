import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with your actual API call
      const { data } = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
      
      console.log("Login successful");
    } catch (err) {
      alert("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your account to continue</p>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white transition-all duration-200 hover:scale-105"
            >
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">G</div>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('GitHub')}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white transition-all duration-200 hover:scale-105"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-4 text-gray-300">or continue with email</span>
            </div>
          </div>

          {/* Login form */}
          <div className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl py-3 px-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl py-3 px-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
                Create account
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            By signing in, you agree to our{' '}
            <button className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;