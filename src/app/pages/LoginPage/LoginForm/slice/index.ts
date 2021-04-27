import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { LoginFormSaga } from './saga';
import { LoginErrorType, LoginFormState } from './types';

export const initialState: LoginFormState = {
  email: '',
  password: '',
  token: '',
  loading: false,
  error: LoginErrorType.NO_ERROR,
};

const slice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    changeEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    changePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    changeToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    changeLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    authenticate(state) {
      state.token = '';
    },
    authenticatedSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    authenticatedError(state, action: PayloadAction<LoginErrorType>) {
      state.token = '';
      state.error = action.payload;
    },
    formError(state, action: PayloadAction<LoginErrorType>) {
      state.token = '';
      state.error = action.payload;
    },
  },
});

export const { actions: loginFormActions, reducer } = slice;

export const useLoginFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: LoginFormSaga });
  return { actions: slice.actions };
};
