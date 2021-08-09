import React, { useState } from 'react';
import styled from 'styled-components';

import DeveloperSignup from '../components/DeveloperSignup.component.jsx';
import ClientSignup from '../components/ClientSignup.component.jsx';
import EnterCode from './EnterCode';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Signup() {
  const [isDeveloper, setIsDeveloper] = useState(true);

  const [showOnSubmit, setShowOnSubmit] = useState({
    showVerification: false,
    isLoading: false,
  });
  const { user } = useSelector((state) => state.userDetails);

  if (!!user) return <Redirect to="/dashboard" />;

  if (showOnSubmit.showVerification) {
    return <EnterCode />;
  }

  return (
    <Container>
      <FormContainer>
        <Switches>
          <SingleSwitch
            onClick={() => setIsDeveloper(true)}
            className={isDeveloper && 'black'}
          >
            Developer
          </SingleSwitch>
          <SingleSwitch
            onClick={() => setIsDeveloper(false)}
            className={!isDeveloper && 'black'}
          >
            Client
          </SingleSwitch>
        </Switches>

        {isDeveloper ? (
          <DeveloperSignup
            // setIsLoading={setIsLoading}
            setShowOnSubmit={setShowOnSubmit}
            showOnSubmit={showOnSubmit}
          />
        ) : (
          <ClientSignup
            // setIsLoading={setIsLoading}
            setShowOnSubmit={setShowOnSubmit}
            showOnSubmit={showOnSubmit}
          />
        )}
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 1.5rem 1rem 1.5rem 1rem;
  background: #ccc;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  overflow: hidden;
  padding-bottom: 2.5rem;
`;

const Switches = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const SingleSwitch = styled.div`
  text-align: center;
  padding: 1rem 0;
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &.black {
    background-color: #2d2d30;
    color: white;
    font-weight: bold;
  }
`;
