import './index.scss';

const AuthWrapper = (props) => {
  const classes = props.className || '';
  return <div className={`auth-wrapper ${classes}`}>{props.children}</div>;
};

export default AuthWrapper;
