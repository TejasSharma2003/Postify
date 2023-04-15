import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'api/axios';
import authSlice, { authActions } from 'features/auth/authSlice';
import { apiSlice } from 'features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { useGetUserQuery } from 'features/user/userSlice';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Function which will take refresh token to backend and give us new access token.
  const refresh = async () => {
    try {
      const res = await axios.get('/users/refresh-token', {
        withCredentials: true,
      });
      dispatch(authActions.setToken(res?.data?.token));
      const { id } = jwt_decode(res?.data?.token);

      /* 
      Manually dispatching an RTK request thunk will create a subscription entry, but it's then up to you to unsubscribe from that data later

      Fetching user without RTK hooks
      dispatch(apiSlice.endpoints.getUser.initiate({ userId: id, token: res.data.token }));
      */

      dispatch(authActions.setUser(id));
      return res.data.token;
    } catch (err) {
      navigate('/login');
      console.log(err);
    }
  };

  return refresh;
};

export default useRefreshToken;
