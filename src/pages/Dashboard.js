import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Dashboard() {
  const token = useSelector((state) => state.userToken);
  const { user } = useSelector((state) => state.userDetails);

  if (!user) return <Redirect to="/" />;
  console.log(token);
  return <div style={{ marginTop: '5rem' }}>Dashboard</div>;
}
