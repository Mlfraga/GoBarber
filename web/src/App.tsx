import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GLobaStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <SignIn />
      <GLobaStyle />
    </>
  );
}

export default App;
