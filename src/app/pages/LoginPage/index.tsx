import * as React from 'react';
import { NavBar } from 'app/components/NavBar';
import { LoginForm } from './LoginForm';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';

export function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <LoginForm />
      </PageWrapper>
    </>
  );
}
