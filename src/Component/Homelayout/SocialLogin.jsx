import React from 'react';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
 

const SocialLogin = () => {
    const navigate = useNavigate();
    

    const handleGoogle = () => {
        toast.info('Please signup first.');
        navigate('/auth/signup');
    };

    return (
        <div>
            <h2 className='font-bold mb-3'>Sign in With</h2>
            <div className='space-y-3'>
                                <button onClick={handleGoogle} className='btn btn-outline btn-primary w-full'>
                                    <FcGoogle size={24} /> Sign in with Google
                </button>
                                <button
                                    className='btn btn-outline btn-primary w-full'
                                    onClick={() => toast.info("It's still under construction. Please try again later")}
                                >
                                    <FaSquareXTwitter size={24} /> Sign in with X
                                </button>
            </div>
        </div>
    );
};

export default SocialLogin;