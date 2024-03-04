import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary font-semibold'>Dashboard</h1>
      <p className='lead text-light'>
        <i className='fas fa-user text-primary'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button
              className='btn btn-sm bg-danger hover:bg-red-600'
              onClick={() => dispatch(deleteAccount())}
            >
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p className='text-light'>
            You have not yet setup a profile. Please add some info!
          </p>
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
