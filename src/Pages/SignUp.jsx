import React, { useState, useContext } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from 'react-toastify';
import { LoadingContext } from '../contexts/LoadingContext.js';

const SignUp = () => {

  const { createUser, setUser, sendEmailVerification, logOut } = useContext(AuthContext) || {};
    const { showLoading, hideLoading } = useContext(LoadingContext) || {};
  const [show, setShow] = useState(false);


  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const firstName = (fd.get("firstName") || "").toString().trim();
    const lastName = (fd.get("lastName") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const password = (fd.get("password") || "").toString();

    // basic client-side validation
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    if (!password) {
      toast.error('Please enter a password');
      return;
    }

  // password policy (user-specified): at least 8 chars, one upper, one lower, one digit, one special (non-word/non-space)
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!pwdRegex.test(password)) {
      toast.error('Password must be at least 8 characters and include upper, lower, number and special char');
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const seed = encodeURIComponent(email.toLowerCase().trim() || fullName || Date.now());
  const photoURL = `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;

    try {
      if (showLoading) showLoading();
      let cred = null;
      if (createUser) {
        cred = await createUser(email, password);
        if (setUser) setUser({ name: fullName || email, email, photoURL });
      } else {
        if (setUser) setUser({ name: fullName || email, email, photoURL });
      }

      // send verification email if possible
      try {
        if (sendEmailVerification) {
          await sendEmailVerification(cred?.user);
          toast.info('Verification email sent. Please check your inbox.');
        }
      } catch (ve) {
        // non-fatal
        console.warn('sendEmailVerification failed', ve);
      }

      // Prevent access until email is verified: sign out and redirect to sign-in
      if (logOut) await logOut();
      toast.success('Signed up successfully. Please verify your email to continue.');
      navigate('/auth/signin');
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Sign up failed');
    } finally {
      if (hideLoading) hideLoading();
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-11/12 mx-auto flex items-center justify-center py-12">
        <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Create Account</h2>
          <p className="text-sm text-gray-500">
            Enter your information to create a new account
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input name="firstName" required
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-gray-50"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input name="lastName" required
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-gray-50"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input name="email"
                type="email"
                required
                className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-gray-50"
                placeholder="john.doe@example.com"
              />
            </div>

            

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input name="password"
                  type={show ? "text" : "password"}
                  required
                  className="block w-full border border-gray-200 rounded px-3 py-2 bg-gray-50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-900"
                >
                  {show ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded mt-2">
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/signin" className="text-red-500">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SignUp;
