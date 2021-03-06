import { useField } from 'formik';
import React from 'react';
import styled from 'styled-components';

export default function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <InputContainer>
      <label className="form__input-label">{label}</label>
      <TextField {...field} {...props} />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </InputContainer>
  );
}

export const InputContainer = styled.div`
  margin: 1rem 0 1.2rem 0;
  width: 80%;
  margin: 1rem auto;
  & > label {
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
    color: #2d2d30;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  @media only screen and (max-width: 565px) {
    width: 100%;
  }
`;

export const Error = styled.div`
  color: red;
  opacity: 0.5;
  margin-left: 3px;
`;

const TextField = styled.input`
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
