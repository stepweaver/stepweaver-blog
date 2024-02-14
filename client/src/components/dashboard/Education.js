import React from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education }) => {
  const dispatch = useDispatch();

  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-sm bg-danger hover:bg-red-600'
          onClick={() => dispatch(deleteEducation(edu._id))}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className='my-2 text-light'>Education Credentials</h2>
      <table className='table'>
        <thead className='text-dark'>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree or Certificate</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody className='text-light'>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;
