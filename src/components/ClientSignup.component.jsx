import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';

import TextInput from '../components/CustomInput.component';
import { Button } from './Signin.component';

export default function Signup({ setShowVerification }) {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(
      "Please enter your company's name / username"
    ),
    email: Yup.string().required('Please enter email'),
    password: Yup.string().required('Please enter a password'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      "Passwords doesn't  match"
    ),
  });

  const handleSignup = async (data) => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/signup', {
        ...data,
        type: 'client',
      });

      if (res.data.success) setShowVerification(true);
    } catch (e) {
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
        await handleSignup(data);
        resetForm();
        console.log(data);
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form>
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

          <Button disabled={!dirty || !isValid} type="submit">
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
}
