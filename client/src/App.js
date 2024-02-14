import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route
            path='/register'
            element={
              <section className='container'>
                <Alert />
                <Register />
              </section>
            }
          />
          <Route
            path='/login'
            element={
              <section className='container'>
                <Alert />
                <Login />
              </section>
            }
          />
          <Route
            path='/dashboard'
            element={
              <section className='container'>
                <PrivateRoute>
                  <Alert />
                  <Dashboard />
                </PrivateRoute>
              </section>
            }
          />
          <Route
            path='/create-profile'
            element={
              <section className='container'>
                <PrivateRoute>
                  <ProfileForm />
                </PrivateRoute>
              </section>
            }
          />
          <Route
            path='/edit-profile'
            element={
              <section className='container'>
                <PrivateRoute>
                  <ProfileForm />
                </PrivateRoute>
              </section>
            }
          />
          <Route
            path='/add-experience'
            element={
              <section className='container'>
                <PrivateRoute>
                  <AddExperience />
                </PrivateRoute>
              </section>
            }
          />
          <Route
            path='/add-education'
            element={
              <section className='container'>
                <PrivateRoute>
                  <AddEducation />
                </PrivateRoute>
              </section>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
