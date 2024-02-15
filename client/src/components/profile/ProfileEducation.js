import React from 'react';
import Moment from 'react-moment';

const ProfileEduction = ({
  education: { school, degree, fieldofstudy, current, to, from, description }
}) => (
  <div className='text-light'>
    <h3 className='font-semibold'>{school}</h3>
    <p>
      <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
      {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

export default ProfileEduction;
