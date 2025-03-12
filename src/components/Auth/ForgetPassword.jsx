import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { forgetPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgetPassword(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgetPassword;