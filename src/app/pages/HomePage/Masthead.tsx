import * as React from 'react';
import styled from 'styled-components/macro';
import { Logos } from './Logos';
import { Title } from './components/Title';
import { ThemeSwitch } from './Features/ThemeSwitch';
import { LanguageSwitch } from './Features/LanguageSwitch';

export function Masthead() {
  return (
    <Wrapper>
      <Logos />
      <Title>MusicLabel</Title>
      <ThemeSwitch />
      <br />
      <LanguageSwitch />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
`;
