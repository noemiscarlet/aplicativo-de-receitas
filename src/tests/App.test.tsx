import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Tests for Req. 02 - 06', () => {
  test('1 - Test if the email input is rendered', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const login = screen.getByTestId('email-input');

    expect(login).toBeInTheDocument();
  });

  test('2 - Test if the password input is rendered', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const password = screen.getByTestId('password-input');

    expect(password).toBeInTheDocument();
  });

  test('3 - User is able to write an eMail in the eMail input field', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const login = screen.getByTestId('email-input');
    fireEvent.change(login, { target: { value: 'xablau@xablau.com' } });
  });

  test('4 - User is able to write a password in the password input field', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const password = screen.getByTestId('password-input');
    fireEvent.change(password, { target: { value: '1234567' } });
  });

  test('5 - Checks if the button ENTER is disabled when eMail is invalid', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const btn = screen.getByTestId('login-submit-btn');
    const login = screen.getByTestId('email-input');

    fireEvent.change(login, { target: { value: 'xablau' } });
    expect(btn).toBeDisabled();
  });

  test('6 - Checks if the button ENTER is disabled when eMail AND password are invalid', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const btnEnter = screen.getByTestId('login-submit-btn');
    const login = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    fireEvent.change(login, { target: { value: 'xablau' } });
    fireEvent.change(password, { target: { value: '1237' } });

    expect(btnEnter).toBeDisabled();
  });

  test('7 - Checks if the button ENTER is enabled when eMail AND password are valid', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const login = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    const btnEnter = screen.getByTestId('login-submit-btn');

    fireEvent.change(login, { target: { value: 'xablau@xablau.com' } });
    fireEvent.change(password, { target: { value: '1234567' } });

    expect(btnEnter).toBeEnabled();
  });

  test('8 - Checks if the user is redirected to the /meals page when the button ENTER is clicked', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const login = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEnter = screen.getByTestId('login-submit-btn');

    fireEvent.change(login, { target: { value: 'xablau@xablau.com' } });
    fireEvent.change(password, { target: { value: '1234567' } });
    fireEvent.click(btnEnter);
    expect(window.location.pathname).toBe('/meals');
  });
});
