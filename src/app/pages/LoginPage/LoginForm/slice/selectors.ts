import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state.loginForm || initialState;

export const selectEmail = createSelector(
  [selectDomain],
  loginFormState => loginFormState.email,
);

export const selectPassword = createSelector(
  [selectDomain],
  loginFormState => loginFormState.password,
);

export const selectToken = createSelector(
  [selectDomain],
  loginFormState => loginFormState.token,
);

export const selectError = createSelector(
  [selectDomain],
  loginFormState => loginFormState.error,
);

export const selectLoading = createSelector(
  [selectDomain],
  loginFormState => loginFormState.loading,
);
