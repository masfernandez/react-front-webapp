import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { TextButton } from './components/TextButton';
import { Title } from '../../HomePage/components/Title';
import { useLoginFormSlice } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import { LoginErrorType } from './slice/types';
import {
  selectEmail,
  selectError,
  selectPassword,
  selectToken,
} from './slice/selectors';

export function LoginForm() {
  const { actions } = useLoginFormSlice();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const error = useSelector(selectError);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const onChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const input = evt.currentTarget;
    const email = evt.currentTarget.value;
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    if (!pattern.test(email)) {
      input.setAttribute('style', 'color:red; border: 1px solid red;');
    } else {
      input.setAttribute('style', 'color:none; border: 1px solid green;');
    }

    dispatch(actions.changeEmail(email));
  };

  const onChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const input = evt.currentTarget;
    const password = evt.currentTarget.value;
    const pattern = new RegExp(/^.{9,20}$/i);

    if (!pattern.test(password)) {
      input.setAttribute('style', 'color:red; border: 1px solid red;');
    } else {
      input.setAttribute('style', 'color:none; border: 1px solid green;');
    }

    dispatch(actions.changePassword(evt.currentTarget.value));
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
    dispatch(actions.authenticate());
  };

  const repoErrorText = (error: LoginErrorType) => {
    switch (error) {
      case LoginErrorType.NO_ERROR:
        return '';
      case LoginErrorType.EMAIL_EMPTY:
        return 'EMAIL_EMPTY';
      case LoginErrorType.PASSWORD_EMPTY:
        return 'PASSWORD_EMPTY';
      case LoginErrorType.BAD_REQUEST:
        return 'BAD_REQUEST';
      case LoginErrorType.UNAUTHORIZED:
        return 'UNAUTHORIZED';
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
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
          />
        </InputWrapper>
        <InputWrapper>
          <Input type="submit" value="Submit" />
        </InputWrapper>
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
