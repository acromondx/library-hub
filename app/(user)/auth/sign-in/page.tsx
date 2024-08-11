"use client";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mt-4 bg-white px-8 py-6 text-left shadow-lg">
        <h3 className="text-center text-2xl font-bold">
          Sign in to your account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-900"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
