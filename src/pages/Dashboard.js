import React from 'react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const token = useSelector((state) => state.userToken);
  console.log(token);
  return <div>Dashboard</div>;
}
