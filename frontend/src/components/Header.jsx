import React from 'react';
import { auth } from '../firebase_config';
import { signOut } from 'firebase/auth';

const Header = ({ user }) => {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-gray-200 supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                            Action Item Minder
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {user && (
                            <>
                                <div className="flex items-center gap-3 bg-white/50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                                    <img
                                        className="h-8 w-8 rounded-full ring-2 ring-white"
                                        src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Generative"}
                                        alt={user.displayName}
                                    />
                                    <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.displayName}</span>
                                </div>
                                <button
                                    onClick={() => signOut(auth)}
                                    className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
