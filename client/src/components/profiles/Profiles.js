import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { profiles, loading } = profile;

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className='large text-primary font-semibold'>Developers</h1>
          <p className='lead text-light'>
            <i className='fab fa-connectdevelop text-primary'></i> Browse and
            connect with developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profiles;
