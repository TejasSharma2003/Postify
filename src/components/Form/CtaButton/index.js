import Loading from 'components/Loading';
import React from 'react';

import { AiOutlineGoogle } from 'react-icons/ai';

const CtaButton = (props) => {
  return (
    <>
      <button
        disabled={!props.formIsValid}
        className="signup__btn signup__btn-submit"
      >
        {props.isLoading ? <Loading /> : <span style={{fontSize:'1.8rem'}}>{props.text}</span>}
      </button>

      <button className="signup__btn signup__btn-auth ">
        <AiOutlineGoogle />
        Sign up with Google
      </button>
    </>
  );
};

export default CtaButton;
