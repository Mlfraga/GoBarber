import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GLobaStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>

      <GLobaStyle />
    </>
  );
}

export default App;
