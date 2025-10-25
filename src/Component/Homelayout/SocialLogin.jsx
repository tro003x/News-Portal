import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    return (
        <div>
            <h2 className='font-bold mb-3'>Login With</h2>
            <div className='space-y-3'>
                <button className='btn btn-outline btn-primary '> <FcGoogle size={24} /> Login with Google</button>
                <button className='btn btn-outline btn-primary w-full'> <FaGithub size={24} />Login with GitHub</button>
            </div>
        </div>
    );
};

export default SocialLogin;