import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import styled from 'styled-components';

import TextInput from './CustomInput.component';
import { Title } from '../pages/Home';

export default function Signup() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter email'),
    password: Yup.string().required('Please enter a password'),
  });
  return (
    <div id="signup">
      <Title style={{ textAlign: 'center' }}>Signin</Title>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          resetForm();
          console.log(data);
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form>
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
            <Button type="submit">Sign in</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const Button = styled.button`
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
