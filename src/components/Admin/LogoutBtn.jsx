import React from 'react';
import AuthService from '../../services/AuthService'
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className='border border-zinc-300 text-sm px-3 py-1.5 rounded-md'
        >
            Logout
        </button>
    );
};

export default LogoutBtn;