import './index.scss';

import { useGetUserQuery } from 'features/user/userSlice';
import { useSelector } from 'react-redux';

const Avatar = (props) => {
  const { userId, token } = useSelector((state) => state.auth);
  const { data: response } = useGetUserQuery({ userId, token });

  const user = response?.data;

  const imageSrc = props.avatar || user?.avatar;

  return (
    <img
      onClick={props.onClick || null}
      className={`avatar ${props.className}`}
      src={`http://localhost:4000/assets/users/${imageSrc}`}
      alt="user-img"
    />
  );
};

export default Avatar;
