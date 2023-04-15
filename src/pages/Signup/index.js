import { useEffect } from 'react';
import './index.scss';

import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//Custom action Created
import { registerUser } from '../../features/auth/authActions';

//Action from authSlice
import { authActions } from '../../features/auth/authSlice';

//Custom Hooks
import useForm from '../../hooks/useForm';

import signupSvg from '../../assets/signup-svg.svg';

//Ui Element
import Container from '../../ui/Container';
import showNotification from '../../ui/showNotification';

//Components
import Input from '../../components/Form/Input';
import CtaButton from '../../components/Form/CtaButton';
import Panaroma from '../../components/Panaroma';

//Other Modules
import { ToastContainer } from 'react-toastify';

import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '../../config/validationRegex';
import AuthWrapper from '../../ui/AuthWrapper';
import CtaWrapper from '../../components/Form/CtaWrapper';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //State from the store
  const { success, loading, error } = useSelector((state) => state.auth);

  const {
    input: name,
    inputValid: nameIsValid,
    inputIsInvalid: nameIsInvalid,
    onChange: onChangeNameInput,
    onBlur: onBlurNameInput,
    resetInput: resetName,
  } = useForm((val) => USERNAME_REGEX.test(val));

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

  const {
    input: passwordConfirm,
    inputValid: passwordConfirmIsValid,
    inputIsInvalid: passwordConfirmIsInvalid,
    onChange: onChangePasswordConfirmInput,
    onBlur: onBlurPasswordConfirmInput,
    resetInput: resetPasswordConfirm,
  } = useForm((val) => passwordIsValid && password === val);

  //Showing Errors if error and state loading is false.
  useEffect(() => {
    if (error && !loading) {
      showNotification(error, 'error');
    }
  }, [error, loading]);

  //Navigating the user and reset the form
  useEffect(() => {
    if (success) {
      showNotification(
        `User account is created! Redirecting you to Home page.`,
        'success'
      );


      //Setting loading to true to show laading spinner while redirecting
      dispatch(authActions.setLoading(true));
      let time = setTimeout(() => {
        //Resetting success and loading to false
        dispatch(authActions.setLoading(false));
        dispatch(authActions.resetSuccess());

        //Reset Form
        resetName();
        resetEmail();
        resetPassword();
        resetPasswordConfirm();

        //Navigating user to login route.
        navigate('/');
      }, 5000);
      return () => {
        clearTimeout(time);
      };
    }
  }, [
    dispatch,
    navigate,
    resetName,
    resetEmail,
    resetPassword,
    resetPasswordConfirm,
    success,
  ]);

  //Over all form validity
  let formIsValid = false;
  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    passwordConfirmIsValid
  ) {
    formIsValid = true;
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    //Validating the form
    const nameTest = USERNAME_REGEX.test(name);
    const emailTest = EMAIL_REGEX.test(email);
    const passwordTest = PASSWORD_REGEX.test(password);

    if (!nameTest) {
      showNotification('User name is not valid', 'error');
      return;
    }

    if (!emailTest) {
      showNotification('Email is not valid', 'error');
      return;
    }

    if (!passwordTest) {
      showNotification('Password is not valid', 'error');
      return;
    }

    dispatch(registerUser({ name: name.trim(), email, password, passwordConfirm }));
  };

  return (
    <Container className="container__auth">
      <AuthWrapper>
        <form onSubmit={onSubmitHandler}>
          <Panaroma text="sign up" />
          <h2 className="signup__heading">Welcome to Postify</h2>
          <Input
            className={nameIsInvalid ? `input--invalid` : ''}
            onChange={onChangeNameInput}
            onBlur={onBlurNameInput}
            inputValue={name}
            inputIsInvalid={nameIsInvalid}
            type="text"
            holder="Your name"
            name="name"
          />
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
          <Input
            className={passwordConfirmIsInvalid ? `input--invalid` : ''}
            onChange={onChangePasswordConfirmInput}
            onBlur={onBlurPasswordConfirmInput}
            inputValue={passwordConfirm}
            inputIsInvalid={passwordConfirmIsInvalid}
            type="password"
            holder="Password Confirm"
            name="password-confirm"
          />
          <span>Already have an account ? <Link style={{ color: 'var(--primary-color)' }} to='/login'>Login</Link></span>

          <CtaWrapper>
            <CtaButton text="Create my account" formIsValid={formIsValid} isLoading={loading} />
          </CtaWrapper>
        </form>
        <div className="signup__vector">
          <img src={signupSvg} alt="signup-svg" />
        </div>
      </AuthWrapper>
    </Container>
  );
};

export default Signup;
