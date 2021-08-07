import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ClientDashboard from './ClientDashboard.js';
import DeveloperDashboard from './DeveloperDashboard.js';

export default function Dashboard() {
  const token = useSelector((state) => state.userToken);
  const { user } = useSelector((state) => state.userDetails);

  if (!user) return <Redirect to="/" />;
  console.log(token);
  return (
    <div style={{ marginTop: '2.5rem', padding: '0 1rem' }}>
      {user.userType === 'developer' ? (
        <DeveloperDashboard />
      ) : (
        <ClientDashboard />
      )}
    </div>
  );
}
