import React, { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { Link } from 'react-router';

const SignUp = () => {
    const [show, setShow] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold">Create Account</h2>
                    <p className="text-sm text-gray-500">Enter your information to create a new account</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-gray-50" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-gray-50" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 bg-gray-50" placeholder="john.doe@example.com" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative">
                                <input
                                    type={show ? 'text' : 'password'}
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

                         <button className="w-full bg-gray-800 text-white py-2 rounded mt-2">Create Account</button>

                        <p className="text-center text-sm text-gray-600">
                               Already have an account? <Link to="/auth/signin" className="text-red-500">Sign in</Link>
                        </p>
                           
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;