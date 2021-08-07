import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextInput, {
  Error,
  InputContainer,
} from '../components/CustomInput.component';
import { Button } from './Signin.component';

export default function Signup({ setShowVerification }) {
  const [technologies, setTechnologies] = useState([]);
  const [technology, setTechnology] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [validGithubUsername, setValidGithubUsername] = useState(true);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleAddTechnology = (e) => {
    if (e.key === 'Enter' && !!technology.trim()) {
      e.preventDefault();
      setTechnologies([...technologies, technology]);
      setTechnology('');
      return;
    }
    setError('');
  };

  const handleRemoveTechnology = (i) => {
    const newArray = technologies;
    technologies.splice(i, 1);
    setTechnologies([...newArray]);
  };

  const handleSignup = async (data) => {
    try {
      dispatch({ type: 'USER_SIGNUP_REQUEST' });
      setValidGithubUsername(true);
      const res = await axios.get(
        `https://api.github.com/users/${data.githubUsername}`
      );
      console.log(res.data);
      const resA = await axios.post('http://localhost:8080/api/auth/signup', {
        ...data,
        avatar: res.data.avatar_url,
        githubUsername: data.githubUsername,
        userType: 'developer',
      });

      console.log(resA.data);
      if (resA.data.success) {
        dispatch({
          type: 'USER_SIGNUP_SUCCESS',
        });

        setShowVerification(true);
      }
    } catch (e) {
      dispatch({
        type: 'USER_SIGNUP_FAIL',
      });
      if (e.response && e.response.data.message === 'Not Found') {
        setValidGithubUsername(false);
        console.log(e.response.data);
      } else {
        console.log(e.response);
      }
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter email'),
    password: Yup.string().required('Please enter a password'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      "Passwords doesn't  match"
    ),
    username: Yup.string().required('Username is a required field'),
    githubUsername: Yup.string().required(
      "You must provide your github's username"
    ),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        githubUsername: '',
      }}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        if (technologies.length === 0) {
          setError('Please add atleast one technology');
          return;
        }

        if (isFocused) return;
        console.log({ ...data, technologies });

        await handleSignup({ ...data, technologies });
        // resetForm();
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form>
          {!validGithubUsername && (
            <FormError>
              Please enter a correct github username{' '}
              <div
                onClick={() => setValidGithubUsername(true)}
                style={{ cursor: 'pointer' }}
              >
                X
              </div>
            </FormError>
          )}
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
          <TextInput
            label="Username:"
            name="username"
            type="text"
            placeholder="Enter an username"
          />
          <TextInput
            label="Github user name:"
            name="githubUsername"
            type="text"
            placeholder="Enter your github's username"
          />

          <InputContainer>
            <label>Technoligies:</label>
            <TechnologiesInput
              label="Technologies: "
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={(e) => handleAddTechnology(e)}
              onChange={(e) => setTechnology(e.target.value)}
              value={technology}
              placeholder="Press enter to add"
            />
            {!!error && <Error>{error}</Error>}
          </InputContainer>
          <PillsContainer>
            {technologies.map((p, i) => (
              <Pill key={i}>
                <Wrapper>
                  <Text> {p}</Text>
                  <Cross onClick={() => handleRemoveTechnology(i)}>x</Cross>
                </Wrapper>
              </Pill>
            ))}
          </PillsContainer>
          <Button disabled={!dirty || !isValid} type="submit">
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
}

const PillsContainer = styled.div`
  width: 80%;
  margin: auto;
`;

const Pill = styled.div`
  display: inline-block;
  border-radius: 7px;
  padding: 7px;
  min-width: 100px;
  margin: 0 3px;
  background-color: #ddd;
  margin-top: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
`;

const Text = styled.div`
  color: black;
  display: inline-block;
`;

const Cross = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(2%);
  background: black;
  text-align: center;
  border-radius: 50%;
  font-size: 13px;
  margin-left: 3px;
  color: white;
  width: 20px;
  height: 20px;
`;

export const TechnologiesInput = styled.input`
  border: none;
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  border-radius: 7px;
  padding: 0.5rem 1.1rem;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border: 1px solid #2d2d30;
  }
`;

export const FormError = styled.div`
  width: 80%;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border: 1px solid red;
  border-radius: 9px;
  background-color: rgba(255, 0, 0, 0.5);
  padding: 0.3rem 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
