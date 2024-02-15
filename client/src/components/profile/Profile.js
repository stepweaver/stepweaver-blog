import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = () => {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch, id]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn bg-light hover:bg-gray-300'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link
                to='/edit-profile'
                className='btn bg-light hover:bg-gray-300'
              >
                Edit Profile
              </Link>
            )}
        </>
      )}
    </>
  );
};

export default Profile;
