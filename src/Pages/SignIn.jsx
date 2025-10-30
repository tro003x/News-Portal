import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { LoadingContext } from '../contexts/LoadingContext.js';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [checking, setChecking] = useState(false);
  const [unverified, setUnverified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [lastEmail, setLastEmail] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [formError, setFormError] = useState("");
  const { setUser, signIn, signInWithGoogle, sendEmailVerification, logOut, sendPasswordResetEmail } = useContext(AuthContext) || {};
  const { showLoading, hideLoading } = useContext(LoadingContext) || {};
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
  const fd = new FormData(e.target);
  const email = (fd.get('email') || '').toString().trim();
  const password = (fd.get('password') || '').toString();
  const remember = fd.get('remember') === 'on';

    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    if (!password) {
      toast.error('Please enter your password');
      return;
    }

  // password policy (user-specified): at least 8 chars, one upper, one lower, one digit, one special (non-word/non-space)
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!pwdRegex.test(password)) {
      toast.warn('Make sure your password meets strength requirements (8+ chars, upper/lower/number/special)');
    }

    try {
      setFormError("");
      setChecking(true);

      if (!signIn) throw new Error('Auth not initialized');
      if (showLoading) showLoading();
      const cred = await signIn(email, password, { remember });
      const u = cred && cred.user ? cred.user : null;
      if (u && !u.emailVerified) {
        // trigger verification email and sign the user out immediately
        try {
          if (sendEmailVerification) {
            await sendEmailVerification(cred.user);
            toast.info('Verification email sent. Please check your inbox.');
          }
        } catch (ve) {
          toast.error(ve?.message || 'Failed to send verification email');
        }
        if (logOut) {
          try { await logOut(); } catch { /* ignore */ }
        }
        setUnverified(true);
        setLastEmail(email);
        setLastPassword(password);
        return;
      }

  const fullName = email.split('@')[0];
  const seed = encodeURIComponent(email.toLowerCase().trim() || fullName || Date.now());
  const photoURL = `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
  // prefer auth provider displayName if available
  const displayName = (u && (u.displayName || u.name)) || fullName;
  if (setUser) setUser({ name: displayName, email, photoURL });
  toast.success(`Signed in successfully — Hi, ${displayName}`);
      navigate('/');
    } catch (err) {
      const code = err && err.code ? err.code : null;
      if (code === 'auth/wrong-password' || code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
        // Show inline error under password field as requested
        setFormError('User name or Password invalid.');
      } else if (code === 'auth/too-many-requests') {
        toast.error('Too many attempts. Try again later.');
      } else {
        toast.error(err.message || 'Sign in failed');
      }
      console.error(err);
    } finally {
      if (hideLoading) hideLoading();
      setChecking(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const emailInput = document.querySelector('input[name="email"]');
    const email = (emailInput?.value || '').trim();
    if (!email) {
      toast.info('Please enter your email first');
      return;
    }
    try {
      await sendPasswordResetEmail(email);
      toast.success('Password reset email sent. Check your inbox.');
    } catch (err) {
      const code = err && err.code ? err.code : null;
      if (code === 'auth/user-not-found') {
        setFormError('User name or Password invalid.');
      } else {
        toast.error(err?.message || 'Failed to send reset email');
      }
    }
  };

  const handleResend = async () => {
    if (!lastEmail || !lastPassword) {
      toast.info('Enter your email and password, then try Sign In to request a new verification email.');
      return;
    }
    try {
      setResendLoading(true);
      const cred = await signIn(lastEmail, lastPassword, { remember: false });
      if (sendEmailVerification) {
        await sendEmailVerification(cred?.user);
        toast.info('Verification email resent. Please check your inbox.');
      }
    } catch (err) {
      toast.error(err?.message || 'Could not resend verification email');
    } finally {
      if (logOut) { try { await logOut(); } catch { /* ignore */ } }
      setResendLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // read remember checkbox from the form
    const rememberEl = document.querySelector('input[name="remember"]');
    const remember = !!(rememberEl && rememberEl.checked);
    try {
      setChecking(true);
      const cred = await signInWithGoogle({ remember });
      const u = cred && cred.user ? cred.user : null;
      if (u && u.emailVerified === false) {
        // Extremely unlikely for Google, but keep logic consistent
        try {
          if (sendEmailVerification) {
            await sendEmailVerification(cred.user);
            toast.info('Verification email sent. Please check your inbox.');
          }
  } catch { /* ignore */ }
  if (logOut) { try { await logOut(); } catch { /* ignore */ } }
        setUnverified(true);
        return;
      }
      const displayName = (u && (u.displayName || u.name)) || 'there';
      if (setUser && u) setUser({ name: displayName, email: u.email, photoURL: u.photoURL });
      toast.success(`Signed in with Google — Hi, ${displayName}`);
      navigate('/');
    } catch (err) {
      // Common Google popup errors: auth/popup-closed-by-user, auth/cancelled-popup-request
      const code = err && err.code ? err.code : '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        toast.info('Google sign-in was cancelled.');
      } else {
        toast.error(err?.message || 'Google sign-in failed');
      }
    } finally {
      setChecking(false);
    }
  };
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="w-11/12 mx-auto flex items-center justify-center py-12">
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
                defaultValue={lastEmail}
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
                  defaultValue={lastPassword}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {show ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </button>
              </div>

              {formError && (
                <p className="mt-2 text-sm text-red-600">{formError}</p>
              )}

              <div className="mt-3 flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input name="remember" type="checkbox" className="checkbox checkbox-sm" defaultChecked />
                  Remember me
                </label>
                <button type="button" onClick={handleResetPassword} className="text-sm link link-hover">Forgot password?</button>
              </div>
            </div>

            <button type="submit" disabled={checking} className="w-full bg-gray-800 text-white py-2 rounded mt-4">{checking ? 'Signing in…' : 'Sign In'}</button>

            <div className="mt-3">
              <button type="button" onClick={handleGoogleSignIn} disabled={checking} className="w-full btn btn-outline">
                Continue with Google
              </button>
            </div>

            {unverified && (
              <div className="mt-4 p-3 rounded bg-yellow-50 border border-yellow-200 text-yellow-800">
                <p className="text-sm">Your email is not verified. Check your inbox for the verification link. Didn’t receive it?</p>
                <div className="mt-2 flex gap-3">
                  <button type="button" onClick={handleResend} className="btn btn-sm btn-warning" disabled={resendLoading}>
                    {resendLoading ? 'Resending…' : 'Resend verification email'}
                  </button>
                  <Link to="/auth/signup" className="btn btn-sm btn-ghost">Use a different email</Link>
                </div>
              </div>
            )}

            <p className="text-center text-sm text-gray-600 mt-3">
              Don't Have An Account?{' '}
              <Link to="/auth/signup" className="text-red-600">Create Account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SignIn;
