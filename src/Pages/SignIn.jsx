import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router";

const SignIn = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Sign In your account</h2>
        </div>

        <div className="bg-white rounded-md shadow p-8">
          <hr className="border-t border-gray-200 mb-6" />

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="mt-2 relative">
                <input
                  type={show ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {show ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </button>
              </div>

              <div className="mt-2">
                <a className="text-sm link link-hover">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded mt-4">Sign In</button>

            <p className="text-center text-sm text-gray-600 mt-3">
              Don't Have An Account ? <a className="text-red-600"> <Link to = '/auth/signup'>Create Account</Link></a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
