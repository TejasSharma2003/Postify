import React from 'react';
import './index.scss';

const Panaroma = (props) => {
  const classes = props.className || '';

  return <span className={`panaroma ${classes}`}>{props.text}</span>;
};

export default Panaroma;
