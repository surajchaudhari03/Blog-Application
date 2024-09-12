import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import BlogLogo from '../../assets/blog-logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password);
      navigate('/admin'); // Redirect to admin dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  const INPUT_CLASS = 'w-full p-2 border border-border rounded outline-none'
  const LABEL_CLASS = 'block text-muted-foreground'
  const BUTTON_CLASS = 'w-full bg-secondary text-secondary-foreground bg-black hover:bg-gray-800 text-white p-2 rounded'

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img aria-hidden="true" alt="Blog Application Logo" src={BlogLogo} className="w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold text-center">Blog Application</h1>
        <p className="text-center">Welcome!</p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className={LABEL_CLASS} htmlFor="email">
              Email
            </label>
            <input onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} type="email" id="email" placeholder="Enter email" required />
          </div>
          <div className="mb-4">
            <label className={LABEL_CLASS} htmlFor="password">
              Password
            </label>
            <input onChange={(e) => setPassword(e.target.value)} className={INPUT_CLASS} type="password" id="password" placeholder="Enter password" required />
          </div>
          <button className={BUTTON_CLASS} type="submit">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-sm text-blue-400 hover:text-red-400">
            Register Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;