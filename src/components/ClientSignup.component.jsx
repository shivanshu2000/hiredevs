import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { FormError } from './DeveloperSignup.component.jsx';

import TextInput from '../components/CustomInput.component';
import { Button } from './Signin.component';
import { api } from '../constants';

export default function Signup({ setShowVerification }) {
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(
      "Please enter your company's name / username"
    ),
    email: Yup.string().required('Please enter email'),
    password: Yup.string().required('Please enter a password'),
    confirmPassword: Yup.string().test(
      'passwords-match',
      'Passwords must match',
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

  const handleSignup = async (data) => {
    console.log('clicked');
    try {
      dispatch({ type: 'USER_SIGNUP_REQUEST' });
      const res = await axios.post(`${api}/api/auth/signup`, {
        ...data,
        userType: 'client',
      });

      if (res.data.success) {
        console.log(res.data.success);
        dispatch({
          type: 'USER_SIGNUP_SUCCESS',
        });
        dispatch({ type: 'SET_USER_TOKEN', payload: res.data.token });
        JSON.stringify(localStorage.setItem('token', res.data.token));

        setShowVerification(true);
      }
    } catch (e) {
      setError(e.response.data.error);
      dispatch({
        type: 'USER_SIGNUP_FAIL',
        payload: e.response.data.error,
      });
      console.log(e.response);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
      }}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        await handleSignup(data);
        setSubmitting(false);
        // resetForm();
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form>
          {!!error && (
            <FormError
              style={{ background: 'red', top: '85%', height: '50px', left: 0 }}
            >
              {error}
              <div onClick={() => setError('')} style={{ cursor: 'pointer' }}>
                X
              </div>
            </FormError>
          )}
          <TextInput
            label="Company Name:"
            name="username"
            placeholder="Enter your company name or just username"
          />
          <TextInput
            label="Email:"
            name="email"
            placeholder="Enter your email"
          />

          <TextInput
            label="Password:"
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          <TextInput
            label="Confirm Password:"
            name="confirmPassword"
            type="password"
            placeholder="Enter your password"
          />

          <Button type="submit">Sign up</Button>
        </Form>
      )}
    </Formik>
  );
}
