import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary font-semibold'>Dashboard</h1>
      <p className='lead text-light'>
        <i className='fas fa-user text-primary'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>has</>
      ) : (
        <>
          <p className='text-light'>You have not yet setup a profile. Please add some info!</p>
          <Link
            to='/create-profile'
            className='btn bg-primary my-1 hover:bg-orange-600'
          >
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
