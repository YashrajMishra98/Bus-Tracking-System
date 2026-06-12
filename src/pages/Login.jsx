import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser, onSuccess, onSwitchToSignup }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Automatically handles the JWT cookie
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user); // Save user to global state
        onSuccess?.();
        navigate('/');      // Redirect to main page
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 id="auth-modal-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {error && <p className="auth-error">{error}</p>}
      {onSwitchToSignup && (
        <p className="auth-switch">
          New here?{' '}
          <button type="button" onClick={onSwitchToSignup}>
            Create an account
          </button>
        </p>
      )}
    </div>
  );
}
