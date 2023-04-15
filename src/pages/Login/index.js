import React, { useEffect, useState } from 'react';
import './index.scss';

import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../features/auth/authActions';

import { useNavigate, Link } from 'react-router-dom';

import { authActions } from '../../features/auth/authSlice';

import loginSvg from '../../assets/login-svg.svg';

//Libraby for popups
import { ToastContainer } from 'react-toastify';

//Custom hook
import useForm from '../../hooks/useForm';

//ui
import Container from '../../ui/Container';
import AuthWrapper from '../../ui/AuthWrapper';
import showNotification from '../../ui/showNotification';

//Components
import Panaroma from '../../components/Panaroma';
import Input from '../../components/Form/Input';
import CtaWrapper from '../../components/Form/CtaWrapper';

//REGEX
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../config/validationRegex';
import CtaButton from '../../components/Form/CtaButton';

const Login = () => {
  const { loading, success, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    input: email,
    inputValid: emailIsValid,
    inputIsInvalid: emailIsInvalid,
    onChange: onChangeEmailInput,
    onBlur: onBlurEmailInput,
    resetInput: resetEmail,
  } = useForm((val) => EMAIL_REGEX.test(val));

  const {
    input: password,
    inputValid: passwordIsValid,
    inputIsInvalid: passwordIsInvalid,
    onChange: onChangePasswordInput,
    onBlur: onBlurPasswordInput,
    resetInput: resetPassword,
  } = useForm((val) => PASSWORD_REGEX.test(val));

  //Showing errors
  useEffect(() => {
    if (error && !loading) {
      showNotification(error, 'error');
      dispatch(authActions.clearError());
    }
  }, [error, loading]);

  //if the credential is successfull gotta redirect the user
  useEffect(() => {
    if (success) {
      showNotification(
        `User has successfully logged in! Redirecting you to the home page.`,
        'success'
      );

      //Loading to true for showing a spinner between the redirecting the user.
      dispatch(authActions.setLoading(true));
      let timer = setTimeout(() => {
        dispatch(authActions.setLoading(false));
        dispatch(authActions.resetSuccess());
        resetEmail();
        resetPassword();
        navigate('/');

      }, 5000);

      return () => {
        console.log('Clearing timeout!');
        clearTimeout(timer);
      };
    }
  }, [success, navigate, resetEmail, resetPassword, dispatch]);

  //Over all form validity
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    //Validating the form
    const emailTest = EMAIL_REGEX.test(email);
    const passwordTest = PASSWORD_REGEX.test(password);

    if (!emailTest) {
      showNotification('Email is not valid', 'error');
      return;
    }

    if (!passwordTest) {
      showNotification('Password is not valid', 'error');
      return;
    }
    dispatch(signInUser({ email, password }));
  };

  return (
    <Container className="container__auth">
      <AuthWrapper className="auth-wrapper__login">
        <form onSubmit={onSubmitHandler} className="login__form">
          <Panaroma text="Login in" />
          <h2 className="login__heading">Let's get you logged in!</h2>
          <Input
            className={emailIsInvalid ? `input--invalid` : ''}
            onChange={onChangeEmailInput}
            onBlur={onBlurEmailInput}
            inputValue={email}
            inputIsInvalid={emailIsInvalid}
            type="email"
            holder="Your email"
            name="email"
          />
          <Input
            className={passwordIsInvalid ? `input--invalid` : ''}
            onChange={onChangePasswordInput}
            onBlur={onBlurPasswordInput}
            inputValue={password}
            inputIsInvalid={passwordIsInvalid}
            type="password"
            holder="Password"
            name="password"
          />
          <span>Create a new account ? <Link style={{color:'var(--primary-color)'}} to='/signup'>Signup</Link></span>
          <CtaWrapper>
            <CtaButton
              text="Log me in!"
              formIsValid={formIsValid}
              isLoading={loading}
            />
          </CtaWrapper>
        </form>
        <div className="login__vector">
          <img src={loginSvg} alt="login-svg" />
        </div>
      </AuthWrapper>
    </Container>
  );
};

export default Login;
