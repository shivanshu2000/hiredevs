import React from 'react';
import { ModalDescription } from './DeveloperDashboard';

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3.5rem',
      }}
    >
      <ModalDescription style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        Page Not Found
      </ModalDescription>
    </div>
  );
}
