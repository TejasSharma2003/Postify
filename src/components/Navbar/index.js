import './index.scss';

import { apiSlice, useLogoutUserMutation } from 'features/api/apiSlice';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'features/auth/authSlice';

import user from '../../assets/user.webp';

import { Link } from 'react-router-dom';

import { RiSearchLine } from 'react-icons/ri';

import Avatar from 'components/Avatar';
import AvatarPh from 'components/AvatarPh';

import Button from 'elements/Button';

import { CiHome } from 'react-icons/ci';
import { useGetUserQuery } from 'features/user/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state) => state.auth);

  const { data: resUser, isLoading: getUserIsLoading } = useGetUserQuery({ token, userId });

  const [logoutUser, { isLoading }] = useLogoutUserMutation();


  const onLogoutHandler = async () => {
    try {
      dispatch(apiSlice.util.resetApiState())
      dispatch(authActions.logout());
      const res = await logoutUser().unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">

        {/* Logo and the Search */}
        <div className='navbar__logo-search'>
          <div className="navbar__logo">
            <Link to={'/'}>
              <h1>Postify</h1>
            </Link>
          </div>

          <div className="navbar__search">
            <RiSearchLine className="navbar__icon-search" />
            <input
              className="navbar__input"
              type="text"
              placeholder="Search postify"
            />
          </div>
        </div>

        {/* Navigation Icons or links */}

        <ul className='navbar__buttons'>
          <li>
            <Link to="/" className='navbar__button'>
              <CiHome className='navbar__icon-btn' />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/" className='navbar__button'>
              <CiHome className='navbar__icon-btn' />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/" className='navbar__button'>
              <CiHome className='navbar__icon-btn' />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/" className='navbar__button'>
              <CiHome className='navbar__icon-btn' />
              <span>Home</span>
            </Link>
          </li>

        </ul>


        <div className="navbar__cta">
          {token ? (
            <Button
              onClick={onLogoutHandler}
              to="/login"
              className="btn--ghost"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button to="/signup" className="btn--fill">
                Signup
              </Button>

              <Button to="/login" className="btn--ghost">
                Login
              </Button>
            </>
          )}
          {getUserIsLoading ?
            <AvatarPh className="navbar__avatar-ph"/>
            :
            <div className="navbar__profile">
              <Avatar imageSrc={user.avatar} />
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
