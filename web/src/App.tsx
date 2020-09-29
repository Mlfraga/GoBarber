import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GLobaStyle from './styles/global';

import AppProvider from './context/index';

import Routes from '../src/routes'

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GLobaStyle />
    </Router>
  );
}

export default App;
