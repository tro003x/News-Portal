import React, { useContext, useState } from 'react';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { LoadingContext } from '../../contexts/LoadingContext.js';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signInWithGoogle } = useContext(AuthContext) || {};
    const { showLoading, hideLoading } = useContext(LoadingContext) || {};
    const [working, setWorking] = useState(false);

    const handleGoogle = async () => {
        if (!signInWithGoogle) {
            toast.error('Google sign-in is not available.');
            return;
        }
        setWorking(true);
        showLoading && showLoading();
        try {
            const cred = await signInWithGoogle({ remember: true });
            const displayName = cred?.user?.displayName || cred?.user?.email || 'there';
            toast.success(`Signed in with Google — Hi, ${displayName}`);
            const to = location?.state?.from?.pathname || '/';
            navigate(to, { replace: true });
        } catch (err) {
            const code = err?.code || '';
            if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
                toast.info('Google sign-in was cancelled.');
            } else {
                toast.error(err?.message || 'Google sign-in failed');
            }
        } finally {
            hideLoading && hideLoading();
            setWorking(false);
        }
    };

    return (
        <div>
            <h2 className='font-bold mb-3'>Sign in With</h2>
            <div className='space-y-3'>
                <button onClick={handleGoogle} disabled={working} className='btn btn-outline btn-primary w-full'>
                    <FcGoogle size={24} /> {working ? 'Signing in…' : 'Sign in with Google'}
                </button>
                <button className='btn btn-outline btn-primary w-full '> <FaSquareXTwitter size={24} /> Sign in with X</button>
            </div>
        </div>
    );
};

export default SocialLogin;