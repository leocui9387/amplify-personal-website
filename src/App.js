import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

function App() {
  
  return (
    <BrowserRouter>

      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;