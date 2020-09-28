import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GLobaStyle from './styles/global';

import ToastContainer from './components/ToastContainer';

import AppProvider from './context/index';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GLobaStyle />
    </>
  );
}

export default App;
