// components/Auth/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Optionally, include role selection
  const [role, setRole] = useState('EMPLOYEE');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { email, password, role });
      alert('Registration successful! Please login.');
      history.push('/');
    } catch (error) {
      console.error('Signup error', error);
      alert('Error during registration');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br/>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Manager</option>
          <option value="EMPLOYEE">Employee</option>
        </select><br/>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
