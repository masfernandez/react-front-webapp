/* --- STATE --- */
export interface LoginFormState {
  email: string;
  password: string;
  token: string;
  loading: boolean;
  error: LoginErrorType;
}

export enum LoginErrorType {
  NO_ERROR,
  EMAIL_EMPTY,
  PASSWORD_EMPTY,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = LoginFormState;
