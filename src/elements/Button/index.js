import React from 'react';
import './index.scss';

import { Link } from 'react-router-dom';

const Button = (props) => {

  return (
    <Link onClick={props?.onClick} className={`btn  ${props.className}`} to={props.to || '#'}>
      {props.children}
    </Link>
  );
};

export default Button;
