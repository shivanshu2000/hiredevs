import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ClientDashboard from './ClientDashboard.js';
import DeveloperDashboard from './DeveloperDashboard.js';
import { Links } from '../components/Nav.component.jsx';

export default function Dashboard() {
  const token = useSelector((state) => state.userToken);
  const { user } = useSelector((state) => state.userDetails);

  if (!user) return <Redirect to="/" />;
  console.log(token);
  return (
    <div style={{ marginTop: '2.5rem', padding: '0 1rem' }}>
      <Links
        style={{
          background: '#12609e',
          borderRadius: '9px',
          fontWeight: 'normal',
          padding: '9px',
        }}
        to="/explore"
      >
        Go to community page
      </Links>
      {user.userType === 'developer' ? (
        <DeveloperDashboard />
      ) : (
        <ClientDashboard />
      )}
    </div>
  );
}
