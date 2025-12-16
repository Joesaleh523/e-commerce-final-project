import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);

    try {

      const { data } = await axios.post(
        "https://your-api.com/auth/forgotPassword",
        { email }
      );

      toast.success(data.message || "Check your email to reset password");
      setEmail(""); 
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error sending reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-200 shadow-lg rounded-lg p-50 w-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Forget Password
        </h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-2 text-gray-700">
            Enter your email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}