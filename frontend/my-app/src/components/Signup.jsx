import React from 'react';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */

function Signup() {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '512px',
        margin: '0 auto',
        fontSize: '16px',
        color: '#0D141C',
        fontWeight: '400',
        padding: '20px 16px',
      }}
    >
      <div
        css={{
          textAlign: 'center',
          fontFeatureSettings: "'dlig' on",
          letterSpacing: '-0.6px',
          alignSelf: 'center',
          font: '700 24px Public Sans, sans-serif ',
        }}
      >
        Sign up for an account
      </div>
      <div
        css={{
          fontFeatureSettings: "'dlig' on",
          fontFamily: 'Public Sans, sans-serif',
          fontWeight: 'bold',  // Make the headline bold
          lineHeight: '150%',
          marginTop: '20px',
          textAlign: 'left',  // Align the headline left
        }}
      >
        Username
      </div>
      <div
        css={{
          fontFeatureSettings: "'dlig' on",
          fontFamily: 'Public Sans, sans-serif',
          justifyContent: 'center',
          alignItems: 'start',
          borderRadius: '12px',
          borderColor: 'rgba(209, 219, 232, 1)',
          borderStyle: 'solid',
          borderWidth: '1px',
          backgroundColor: '#F7FAFC',
          marginTop: '8px',
          color: '#4F7396',
          lineHeight: '150%',
          padding: '15px',
          width: '100%',
        }}
      >
        Enter your username
      </div>
      <div
        css={{
          fontFeatureSettings: "'dlig' on",
          fontFamily: 'Public Sans, sans-serif',
          fontWeight: 'bold',  // Make the headline bold
          lineHeight: '150%',
          marginTop: '24px',
          textAlign: 'left',  // Align the headline left
        }}
      >
        Email
      </div>
      <div
        css={{
          fontFeatureSettings: "'dlig' on",
          fontFamily: 'Public Sans, sans-serif',
          justifyContent: 'center',
          alignItems: 'start',
          borderRadius: '12px',
          borderColor: 'rgba(209, 219, 232, 1)',
          borderStyle: 'solid',
          borderWidth: '1px',
          backgroundColor: '#F7FAFC',
          marginTop: '8px',
          color: '#4F7396',
          lineHeight: '150%',
          padding: '15px',
          width: '100%',
        }}
      >
        Enter your email
      </div>
      <div
        css={{
          fontFeatureSettings: "'dlig' on",
          fontFamily: 'Public Sans, sans-serif',
          fontWeight: 'bold',  // Make the headline bold
          lineHeight: '150%',
          marginTop: '24px',
          textAlign: 'left',  // Align the headline left
        }}
      >
        Password
      </div>
      <div
        css={{
          fontFeatureSettings: "'dlig' on",
          fontFamily: 'Public Sans, sans-serif',
          justifyContent: 'center',
          alignItems: 'start',
          borderRadius: '12px',
          borderColor: 'rgba(209, 219, 232, 1)',
          borderStyle: 'solid',
          borderWidth: '1px',
          backgroundColor: '#F7FAFC',
          marginTop: '8px',
          color: '#4F7396',
          lineHeight: '150%',
          padding: '15px',
          width: '100%',
        }}
      >
        Create a password
      </div>
      <div
        css={{
          fontFeatureSettings: "'dlig' on",
          fontFamily: 'Public Sans, sans-serif',
          fontWeight: 'bold',  // Make the headline bold
          lineHeight: '150%',
          marginTop: '24px',
          textAlign: 'left',  // Align the headline left
        }}
      >
        Confirm password
      </div>
      <div
        css={{
          fontFeatureSettings: "'dlig' on",
          fontFamily: 'Public Sans, sans-serif',
          justifyContent: 'center',
          alignItems: 'start',
          borderRadius: '12px',
          borderColor: 'rgba(209, 219, 232, 1)',
          borderStyle: 'solid',
          borderWidth: '1px',
          backgroundColor: '#F7FAFC',
          marginTop: '8px',
          color: '#4F7396',
          lineHeight: '150%',
          padding: '15px',
          width: '100%',
        }}
      >
        Re-enter your password
      </div>
      <div
        css={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '12px',
          backgroundColor: '#1A80E5',
          display: 'flex',
          marginTop: '24px',
          fontSize: '14px',
          color: '#F7FAFC',
          fontWeight: '700',
          letterSpacing: '0.21px',
          lineHeight: '150%',
          padding: '10px 16px',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        Sign up
      </div>
      <div
        css={{
          color: '#4F7396',
          textAlign: 'center',
          fontFeatureSettings: "'dlig' on",
          alignSelf: 'center',
          marginTop: '16px',
          font: '14px/150% Public Sans, sans-serif ',
        }}
      >
        Already have an account?<Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
