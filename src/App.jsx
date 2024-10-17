import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from "aws-amplify";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
        name: {
          required: true,
        },
        phone_number: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
})

export default function App() {
  //defining a constant with REACT_APP_API_URL value
  const { COGNITO_USER_POOL_ID, COGNITO_USER_POOL_CLIENT_ID, SYNCHAT_CONVERSATION_HUB } = process.env;

  return (
  <div>
    <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h2>Hello {user?.username} - {COGNITO_USER_POOL_ID}</h2>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
      <div>
      <h3>User Pool Id: {COGNITO_USER_POOL_ID}</h3>
      <h3>User Pool Client Id: {COGNITO_USER_POOL_CLIENT_ID}</h3>
      <h3>Synchat Conversation Hub: {SYNCHAT_CONVERSATION_HUB}</h3>
    </div>
  </div>
  );
}