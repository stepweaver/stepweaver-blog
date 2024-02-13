import React from 'react';

const Spinner = () => (
  <div className='flex items-center justify-center'>
    <div className='loading loading-infinity rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 text-primary'></div>
  </div>
)

export default Spinner;