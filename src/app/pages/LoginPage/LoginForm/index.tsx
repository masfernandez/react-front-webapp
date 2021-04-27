import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { TextButton } from './components/TextButton';
import { Title } from '../../HomePage/components/Title';
import { useLoginFormSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { LoginErrorType } from './slice/types';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import {
  selectEmail,
  selectError,
  selectLoading,
  selectPassword,
  selectToken,
} from './slice/selectors';

export function LoginForm() {
  const { actions } = useLoginFormSlice();
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const error = useSelector(selectError);
  const token = useSelector(selectToken);
  const loading = useSelector(selectLoading);

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeEmail(evt.currentTarget.value));
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changePassword(evt.currentTarget.value));
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  function isWrongEmail(email) {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    return !pattern.test(email);
  }

  function isWrongPassword(password) {
    const pattern = new RegExp(/^.{10,255}$/i);
    return !pattern.test(password);
  }

  const onBlurEmail = (evt: React.FocusEvent<HTMLInputElement>) => {
    const input = evt.currentTarget;
    const email = evt.currentTarget.value;
    if (isWrongEmail(email)) {
      input.setAttribute('style', 'color:red; border: 1px solid red;');
    } else {
      input.setAttribute('style', 'color:none; border: 1px solid green;');
    }
  };

  const onBlurPassword = (evt: React.FocusEvent<HTMLInputElement>) => {
    const input = evt.currentTarget;
    const password = evt.currentTarget.value;
    if (isWrongPassword(password)) {
      input.setAttribute('style', 'color:red; border: 1px solid red;');
    } else {
      input.setAttribute('style', 'color:none; border: 1px solid green;');
    }
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    if (isWrongEmail(email)) {
      dispatch(actions.formError(LoginErrorType.WRONG_EMAIL));
      return;
    }

    if (isWrongPassword(password)) {
      dispatch(actions.formError(LoginErrorType.WRONG_PASSWORD));
      return;
    }

    dispatch(actions.formError(LoginErrorType.NO_ERROR));
    dispatch(actions.authenticate());
  };

  const repoErrorText = (error: LoginErrorType) => {
    switch (error) {
      case LoginErrorType.NO_ERROR:
        return '';
      case LoginErrorType.WRONG_EMAIL:
        return 'The email does not seems to be a valid email';
      case LoginErrorType.WRONG_PASSWORD:
        return 'Password should be longer than 10 characters';
      case LoginErrorType.UNAUTHORIZED:
        return 'Wrong credentials';
      default:
        return 'An error has occurred!';
    }
  };

  useEffectOnMount(() => {});

  return (
    <Wrapper>
      <Title>Login</Title>
      <FormGroup onSubmit={onSubmitForm}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
            onBlur={onBlurPassword}
          />
        </InputWrapper>
        <InputWrapper>
          <SubmitInput type="submit" value="Submit" />
        </InputWrapper>
        {loading ? <LoadingIndicator small /> : ''}
      </FormGroup>
      <ErrorText>{repoErrorText(error)}</ErrorText>
      <P>
        <small>{token}</small>
      </P>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 400px;

  ${Input} {
    width: ${100}%;
    margin-right: 0.5rem;
  }
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

export const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  margin: 0.625rem 0 1.5rem 0;
`;

const SubmitInput = styled(Input)`
  &:focus {
    border-color: ${p => p.theme.textSecondary};
    box-shadow: 0 0 0 0;
  }
`;
