import React from 'react';

export default function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2.5rem',
      }}
    >
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  );
}
