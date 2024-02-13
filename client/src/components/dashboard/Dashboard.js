import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
