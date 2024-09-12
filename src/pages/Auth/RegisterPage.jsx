import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import BlogLogo from '../../assets/blog-logo.png';

const styles = {
  input: 'w-full p-2 border border-border rounded outline-none',
  label: 'block text-muted-foreground',
  button: 'w-full bg-secondary text-secondary-foreground bg-black hover:bg-gray-800 text-white p-2 rounded'
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(email, password, name);
      navigate('/admin'); // Redirect to admin dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-sm">
          <div className="flex justify-center mb-4">
            <img aria-hidden="true" alt="Blog Application Logo" src={BlogLogo} className="w-16 h-16" />
          </div>
          <h1 className="text-2xl font-bold text-foreground text-center">Blog Application</h1>
          <p className="text-muted-foreground text-center">Welcome!</p>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className={styles.label} htmlFor="email">
              <span className='text-red-500'>*</span>
                Email
              </label>
              <input onChange={(e) => setEmail(e.target.value)} className={styles.input} type="email" id="email" placeholder="Your email" required />
            </div>
            <div className="mb-4">
              <label className={styles.label} htmlFor="name">
              <span className='text-red-500'>*</span> 
                Name
              </label>
              <input onChange={(e) => setName(e.target.value)} className={styles.input} type="text" id="name" placeholder="Your name" required />
            </div>
            <div className="mb-4">
              <label className={styles.label} htmlFor="password">
              <span className='text-red-500'>*</span> 
                Password
              </label>
              <input onChange={(e) => setPassword(e.target.value)} className={styles.input} type="password" id="password" placeholder="Your password" required />
            </div>
            <button className={styles.button} type="submit">
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-muted-foreground">
            Have an account?{' '}
            <a href="/login" className="text-primary">
              Sign in
            </a>
          </p>
        </div>
      </div>
  );
};

export default RegisterPage;