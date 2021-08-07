import React, { useState } from 'react';
import styled from 'styled-components';

import DeveloperSignup from '../components/DeveloperSignup.component.jsx';
import ClientSignup from '../components/ClientSignup.component.jsx';
import EnterCode from './EnterCode';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Signup() {
  const [isDeveloper, setIsDeveloper] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const { user } = useSelector((state) => state.userDetails);

  if (!!user) return <Redirect to="/dashboard" />;

  if (showVerification) {
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
          <DeveloperSignup setShowVerification={setShowVerification} />
        ) : (
          <ClientSignup setShowVerification={setShowVerification} />
        )}
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 1.5rem 1rem 1.5rem 1rem;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
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
