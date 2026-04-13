import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom'; // Make sure this is react-router-dom if using web
import { FaVideo, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    return (
        <header className='fixed top-0 left-0 right-0 bg-white z-50 shadow-sm border-b border-gray-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Removed flex-wrap to prevent layout breaking, kept h-16 for the main bar */}
                <div className='flex justify-between items-center h-16'>
                    
                    {/* Logo Area */}
                    <Link to="/" onClick={closeMenu} className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center'>
                            <FaVideo className='w-6 h-6 text-white' />
                        </div>
                        <h1 className='text-xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                            LearnX
                        </h1>
                    </Link>

                    {/* Desktop Navigation (Hidden on Mobile) */}
                    <nav className='hidden md:flex items-center space-x-4'>
                        {isAuthenticated ? (
                            <>
                                <Link to={'/dashboard'} className='text-gray-700 hover:text-blue-600 font-medium transition-colors'>
                                    Dashboard
                                </Link>
                                <div className='flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg'>
                                    <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center'>
                                        <span className='text-white text-sm font-semibold'>
                                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                        </span>
                                    </div>
                                    <span className='text-gray-700 font-medium text-sm'>
                                        {user?.name}
                                    </span>
                                </div>
                                <button onClick={logout} className='px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-sm'>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={'/login'} className='text-gray-700 hover:text-blue-600 font-medium transition-colors'>
                                    Sign In
                                </Link>
                                <Link to={'/register'} className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors shadow-sm'>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Toggle Button (Hidden on Desktop) */}
                    <div className='md:hidden flex items-center'>
                        <button 
                            onClick={toggleMenu}
                            className='text-gray-600 hover:text-blue-600 focus:outline-none p-2'
                        >
                            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className='md:hidden bg-white border-t border-gray-200 shadow-lg'>
                    <div className='px-4 pt-2 pb-4 space-y-3'>
                        {isAuthenticated ? (
                            <>
                                <div className='flex items-center space-x-3 px-3 py-3 bg-gray-50 rounded-lg'>
                                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center'>
                                        <span className='text-white font-semibold'>
                                            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                        </span>
                                    </div>
                                    <span className='text-gray-800 font-semibold'>{user?.name}</span>
                                </div>
                                <Link 
                                    to={'/dashboard'} 
                                    onClick={closeMenu}
                                    className='block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md'
                                >
                                    Dashboard
                                </Link>
                                <button 
                                    onClick={handleLogout} 
                                    className='w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to={'/login'} 
                                    onClick={closeMenu}
                                    className='block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md'
                                >
                                    Sign In
                                </Link>
                                <Link 
                                    to={'/register'} 
                                    onClick={closeMenu}
                                    className='block px-3 py-2 text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm'
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;