import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { api } from '../constants';
import TextInput from './CustomInput.component';
import { Title } from '../pages/Home';
import { FormError } from './DeveloperSignup.component';

export default function Signup() {
  const history = useHistory();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter email'),
    password: Yup.string().required('Please enter a password'),
  });

  const handleLogin = async ({ email, password }) => {
    try {
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
      });
      const res = await axios.post(`${api}/api/auth/login`, {
        email: email,
        password: password,
      });

      console.log(res.data);
      if (res.data.success) {
        console.log('here');
        dispatch({ type: 'USER_LOGIN_SUCCESS' });
        dispatch({ type: 'SET_USER_TOKEN', payload: res.data.token });
        dispatch({ type: 'USER_DETAILS_SUCCESS', payload: res.data.user });
        localStorage.setItem('token', res.data.token);

        return history.push('/dashboard');
      }
    } catch (e) {
      console.log(e.response);
      if (e.response) {
        setError(e.response.data.error);
      } else {
        setError('Something went wrong');
      }
    }
  };
  return (
    <div id="signup">
      <Title style={{ textAlign: 'center', marginTop: '9px' }}>Signin</Title>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          await handleLogin(data);
          // resetForm();
          console.log(data);
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form>
            {!!error && (
              <FormError>
                {error}
                <div onClick={() => setError('')} style={{ cursor: 'pointer' }}>
                  X
                </div>
              </FormError>
            )}
            <TextInput
              label="Email:"
              name="email"
              placeholder="Enter your email"
            />

            <div style={{ marginTop: '1.9rem' }} />

            <TextInput
              label="Password:"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <Button disabled={!dirty || !isValid} type="submit">
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export const Button = styled.button`
  color: white;
  text-transform: uppercase;
  border-radius: 25px;
  border: none;
  display: block;
  padding: 9px 1.5rem;
  background-color: #2d2d30;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 auto;
  margin-top: 2rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
