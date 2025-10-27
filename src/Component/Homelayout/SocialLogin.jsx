import React from 'react';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    return (
        <div>
            <h2 className='font-bold mb-3'>Sign in With</h2>
            <div className='space-y-3'>
                <button className='btn btn-outline btn-primary w-full '> <FcGoogle size={24} /> Sign in with Google</button>
                <button className='btn btn-outline btn-primary w-full '> <FaSquareXTwitter size={24} /> Sign in with X</button>
            </div>
        </div>
    );
};

export default SocialLogin;