import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { LoadingContext } from '../contexts/LoadingContext';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [checking, setChecking] = useState(false);
  const { setUser, signIn, checkEmailAvailable } = useContext(AuthContext) || {};
  const { showLoading, hideLoading } = useContext(LoadingContext) || {};
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = (fd.get('email') || '').toString().trim();
    const password = (fd.get('password') || '').toString();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    // password policy: at least 8 chars, one upper, one lower, one digit, one special
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!pwdRegex.test(password)) {
      toast.warn('Make sure your password meets strength requirements (8+ chars, upper/lower/number/special)');
    }

    try {
      if (!checkEmailAvailable) throw new Error('Auth not initialized');
      setChecking(true);
      const available = await checkEmailAvailable(email);
      if (available) {
        toast.info('No account found for this email. You can create one.');
        navigate('/auth/signup');
        return;
      }

      if (!signIn) throw new Error('Auth not initialized');
      if (showLoading) showLoading();
      const cred = await signIn(email, password);
      const u = cred && cred.user ? cred.user : null;
      if (u && !u.emailVerified) {
        toast.info('Your email is not verified. Check your inbox.');
        navigate('/auth/check-email');
        return;
      }

      const fullName = email.split('@')[0];
      const seed = encodeURIComponent(email.toLowerCase().trim() || fullName || Date.now());
      const photoURL = `https://avatars.dicebear.com/api/identicon/${seed}.svg`;
      if (setUser) setUser({ name: fullName, email, photoURL });
      toast.success('Signed in successfully');
      navigate('/');
    } catch (err) {
      const code = err && err.code ? err.code : null;
      if (code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else if (code === 'auth/user-not-found') {
        toast.error('No account found for this email');
      } else if (code === 'auth/too-many-requests') {
        toast.error('Too many attempts. Try again later.');
      } else if (code === 'auth/invalid-credential') {
        toast.error('Invalid sign-in credentials. If you do not have an account, please sign up.');
      } else {
        toast.error(err.message || 'Sign in failed');
      }
      console.error(err);
    } finally {
      if (hideLoading) hideLoading();
      setChecking(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Sign In your account</h2>
        </div>

        <div className="bg-white rounded-md shadow p-8">
          <hr className="border-t border-gray-200 mb-6" />

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full mt-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="mt-2 relative">
                <input
                  name="password"
                  required
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

            <button type="submit" disabled={checking} className="w-full bg-gray-800 text-white py-2 rounded mt-4">{checking ? 'Signing in…' : 'Sign In'}</button>

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
