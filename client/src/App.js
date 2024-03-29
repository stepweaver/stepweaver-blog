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
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
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
            path='/profiles'
            element={
              <section className='container'>
                <Alert />
                <Profiles />
              </section>
            }
          />
          <Route
            path='/profile/:id'
            element={
              <section className='container'>
                <Alert />
                <Profile />
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
                  <Alert />
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
                  <Alert />
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
                  <Alert />
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
                  <Alert />
                  <AddEducation />
                </PrivateRoute>
              </section>
            }
          />
          <Route
            path='/posts'
            element={
              <section className='container'>
                <PrivateRoute>
                  <Alert />
                  <Posts />
                </PrivateRoute>
              </section>
            }
          />
          <Route
            path='/post/:id'
            element={
              <section className='container'>
                <PrivateRoute>
                  <Alert />
                  <Post />
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
