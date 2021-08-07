import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Signin from '../components/Signin.component.jsx';

export default function Home() {
  const { user } = useSelector((state) => state.userDetails);
  if (!!user) return <Redirect to="/dashboard" />;
  return (
    <HomeContainer>
      <Hero>
        <Title>Hiredevs</Title>
        <HeroBody>
          Hire the developers to work for you as per your requirements. Sign up
          either you are a developer or a client.{' '}
          <CustomLink to="/signup">Click here</CustomLink> to sign up if you're
          a developer and create a profile to attract your clients.
        </HeroBody>
      </Hero>
      <SigninContainer>
        <Signin />
      </SigninContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2.5fr;
  grid-gap: 1rem 1rem;
  /* margin-top: 3.5rem; */
  padding: 2.5rem 2.5rem 2.5rem 1rem;
  min-height: 100vh;
  background-color: #2d2d3050;

  @media only screen and (max-width: 680px) {
    display: flex;
    flex-direction: column;
  }
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  align-items: flex-start;
  margin-left: 1.5rem;
`;

export const Title = styled.div`
  font-family: 'Italianno', cursive;
  font-size: 3.5rem;
`;

const HeroBody = styled.div`
  font-size: 1.2em;
  width: 70%;
  color: #000000;
  text-align: justify;
  text-justify: inter-word;
  line-height: 2;

  @media only screen and (max-width: 680px) {
    width: 100%;
  }
`;

const SigninContainer = styled.div`
  padding: 1rem;
  border: 1px solid black;
  padding: 1.5rem 1rem 1.5rem 1rem;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  height: 400px;
  max-height: 600px;
`;

const CustomLink = styled(Link)`
  color: purple;
  text-decoration: underline;
`;
