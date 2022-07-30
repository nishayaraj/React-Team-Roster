import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <h1 style={{ margin: '30px 0px' }}>Welcome to Hunger Games</h1>
      <p style={{ margin: '10px 0px 50px', fontSize: '22px' }}>
        Click the button below to login & get started!
      </p>
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
