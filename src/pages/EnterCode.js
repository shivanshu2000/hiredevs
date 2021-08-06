import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Signin.component';
import { TechnologiesInput } from '../components/DeveloperSignup.component.jsx';
import { FormError } from '../components/DeveloperSignup.component.jsx';

export default function EnterCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleVerifyCode = async () => {
    if (code.trim().length === 0) {
      setError('Please fill the code');
    }
    try {
      const res = await axios.post(
        'http://localhost:8080/api/auth/verify-code',
        {
          code: code,
        }
      );
      console.log(res.data.success);
      if (res.data.success) {
        console.log(res.data.success);
        history.push('/dashboard');
      }
    } catch (e) {
      setError(e.response.data.error);
      console.log(e.response.data);
    }
  };

  useEffect(() => {
    if (code.trim().length > 0) setError('');
  }, [code]);

  return (
    <Container>
      <Card>
        <h3
          style={{
            textAlign: 'center',

            letterSpacing: '0.3px',
          }}
        >
          Enter the code to verify your mail
        </h3>
        {!!error && (
          <FormError style={{ marginTop: '1rem' }}>
            {error}{' '}
            <span style={{ cursor: 'pointer' }} onClick={() => setError('')}>
              X
            </span>
          </FormError>
        )}
        <TechnologiesInput
          style={{
            display: 'block',
            margin: '0 auto',
            width: '80%',
            marginTop: '1rem',
          }}
          placeholder="Enter the code"
          type="text"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <Button onClick={handleVerifyCode}>Verify code</Button>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 600px;
  border: 9px;
  padding: 2.5rem 0;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
`;
