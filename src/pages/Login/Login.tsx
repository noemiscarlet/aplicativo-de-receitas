import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../../types/types';

export default function Login() {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

  function handleFormInputs(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const enableBtnEnter = () => formData.password.length > 6
  && emailRegex.test(formData.email);
  const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    navigate('/meals');
  };

  return (
    <div>
      <form onSubmit={ handleFormSubmit }>
        <label htmlFor="email-input">eMail</label>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          id="email-input"
          required
          onChange={ handleFormInputs }
        />
        <label htmlFor="password-input">Password</label>
        <input
          data-testid="password-input"
          type="password"
          name="password"
          id="password-input"
          required
          onChange={ handleFormInputs }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ !enableBtnEnter() }
        >
          Enter

        </button>
      </form>
    </div>
  );
}
