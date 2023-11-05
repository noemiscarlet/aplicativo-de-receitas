/* import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const EMAIL_VALUE = 'xablau@xablau.com';
const EMAIL_VALUE_NOT_OK = 'xablau';
const PASSWORD_VALUE = '1234567';
const PASSWORD_VALUE_NOT_OK = '1237';
const BTN_ENTER = 'login-submit-btn';

describe('Tests for Req. 02 - 06', () => {
  test('1 - Test if the email input is rendered', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const login = screen.getByTestId(EMAIL_INPUT);

    expect(login).toBeInTheDocument();
  });

  test('2 - Test if the password input is rendered', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const password = screen.getByTestId(PASSWORD_INPUT);

    expect(password).toBeInTheDocument();
  });

  test('3 - User is able to write an eMail in the eMail input field', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const login = screen.getByTestId(EMAIL_INPUT);
    fireEvent.change(login, { target: { value: EMAIL_VALUE } });
  });

  test('4 - User is able to write a password in the password input field', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const password = screen.getByTestId(PASSWORD_INPUT);
    fireEvent.change(password, { target: { value: PASSWORD_VALUE } });
  });

  test('5 - Checks if the button ENTER is disabled when eMail is invalid', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const btn = screen.getByTestId(BTN_ENTER);
    const login = screen.getByTestId(EMAIL_INPUT);

    fireEvent.change(login, { target: { value: EMAIL_VALUE_NOT_OK } });
    expect(btn).toBeDisabled();
  });

  test('6 - Checks if the button ENTER is disabled when eMail AND password are invalid', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const btnEnter = screen.getByTestId(BTN_ENTER);
    const login = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);

    fireEvent.change(login, { target: { value: EMAIL_VALUE_NOT_OK } });
    fireEvent.change(password, { target: { value: PASSWORD_VALUE_NOT_OK } });

    expect(btnEnter).toBeDisabled();
  });

  test('7 - Checks if the button ENTER is enabled when eMail AND password are valid', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const login = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);

    const btnEnter = screen.getByTestId(BTN_ENTER);

    fireEvent.change(login, { target: { value: EMAIL_VALUE } });
    fireEvent.change(password, { target: { value: PASSWORD_VALUE } });

    expect(btnEnter).toBeEnabled();
  });

  test('8 - Checks if the user is redirected to the /meals page when the button ENTER is clicked', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const login = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const btnEnter = screen.getByTestId(BTN_ENTER);

    fireEvent.change(login, { target: { value: EMAIL_VALUE } });
    fireEvent.change(password, { target: { value: PASSWORD_VALUE } });
    fireEvent.click(btnEnter);
    expect(window.location.pathname).toBe('/meals');
  });
});
 */
