import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  
  return (
    <div className='profile bg-gradient-to-r from-orange-700/5 to-slate-950/95 hover:shadow-lg hover:shadow-black rounded-xl'>
      <img src={avatar} alt='' className='round-img shadow-lg shadow-black' />
      <div>
        <h2 className='text-light'>{name}</h2>
        <p className='text-light'>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1 text-light'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-sm bg-primary hover:bg-orange-600'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-light'>
            <i className='fas fa-check text-primary text-xs'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
