import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './authActions';
import { signInUser } from './authActions';

let initialState = {
  user: null,
  userId: null,
  token: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.userId = action.payload;
    }

  },

  //Extra Reducers handler async functions
  //Actions created with createAsyncThunk generate three possible lifecycle action types: pending, fulfilled, and rejected.
  extraReducers: (builder) => {
    //Register end states
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        const { data: user } = payload.data;
        state.user = user;
        state.userId = user.id;
        state.token = payload.token;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //Login end staes
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        const { data: user } = payload;
        state.user = user;
        state.userId = user.id;
        state.token = payload.token;
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
