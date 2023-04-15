import { useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

import EmailValidationList from '../Validation/EmailValidationList';
import NameValidationList from '../Validation/NameValidationList';
import PasswordValidationList from '../Validation/PasswordValidationList';

//React Icon
import { RxEyeOpen } from 'react-icons/rx';
import { RxEyeClosed } from 'react-icons/rx';

const Input = (props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const onMouseEnterHandler = () => {
    setIsShow(true);
  };

  const onMouseLeaveHandler = () => {
    setIsShow(false);
  };
  return (
    <div className="input">
      <input
        onChange={props.onChange}
        onBlur={props.onBlur}
        //Tooggle the password visiblity for password field  only
        type={props.type === 'password' && isShowPassword ? 'text' : props.type}
        placeholder={props.holder}
        className={`input__field input__name ${props.className}`}
        value={props.inputValue}
        autoComplete="off"
      />
      {/* Showing open eye when the input is for password and isShowPassword is true. */}
      {props.type === 'password' && isShowPassword ? (
        <RxEyeOpen
          onClick={() => setIsShowPassword((pre) => !pre)} //Toggle the visiblity icon when click on it
          className="input__password-eye"
        />
      ) : props.type === 'password' && !isShowPassword ? (
        <RxEyeClosed
          onClick={() => setIsShowPassword((pre) => !pre)} 
          className="input__password-eye"
        />
      ) : (
        ''
      )}
      {/* Invalid icon when the input is invalid. */}
      {props.inputIsInvalid && (
        <BiErrorCircle
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          className="input__error-icon"
        />
      )}
      <div
        className={`input__requirement ${
          isShow && props.inputIsInvalid ? 'input__requirement--show' : ''
        }`}
      >
        {props.name === 'email' && <EmailValidationList />}
        {props.name === 'name' && <NameValidationList />}
        {props.name === 'password' && <PasswordValidationList />}
        {props.name === 'password-confirm' && (
          <ul>
            <li>Your Password doesn't matched</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Input;
