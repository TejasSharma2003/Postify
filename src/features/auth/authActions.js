import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const REGISTER_URL = '/users/signup';
const SIGN_IN_URL = '/users/login';

//Thunk is a function which returns a function which performs async task
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, passwordConfirm }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        REGISTER_URL,
        {
          name,
          email,
          password,
          passwordConfirm,
        },
        config
      );
      return data;
    } catch (err) {
      // return custom error message from backend if present
      if (err?.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  }
);

export const signInUser = createAsyncThunk(
  '/auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        SIGN_IN_URL,
        {
          email,
          password,
        },
        config
      );

      return data;
    } catch (err) {
      if (err?.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);
