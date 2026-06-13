import { useState } from 'react';

export default function Signup({ onSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage('Signup successful! You can now log in.');
        onSuccess?.();
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      setMessage('Network error: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 id="auth-modal-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Create Account</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      {onSwitchToLogin && (
        <p className="auth-switch">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin}>
            Login
          </button>
        </p>
      )}
    </div>
  );
}
