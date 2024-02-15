import React from 'react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <div className='profile-about text-light p-1'>
      {bio && (
        <>
          <h2 className='text-primary font-semibold text-xl'>
            {name.trim().split(' ')[0]}'s Bio
          </h2>
          <p className='p-1'>{bio}</p>
          <div className='line'></div>
        </>
      )}
      <h2 className='text-primary font-semibold text-xl'>Skill Set</h2>
      <div className='skills'>
        {skills.map((skill, index) => (
          <div key={index} className='p-1'>
            <i className='fas fa-check'></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
