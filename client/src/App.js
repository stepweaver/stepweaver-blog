import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route
          path='/register'
          element={
            <section className='container'>
              <Register />
            </section>
          }
        />
        <Route
          path='/login'
          element={
            <section className='container'>
              <Login />
            </section>
          }
        />
      </Routes>
    </Router>
  </Provider>
);

export default App;