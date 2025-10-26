import React from 'react';
import swimmingImage from '../../assets/swimming.png'
import classImage from '../../assets/class.png'
import playImage from '../../assets/playground.png'

const QZone = () => {
    return (
      <div className='bg-base-200 p-3'>
          <div className='font-bold mt-8'>
            <h2>QZone</h2>
        </div>
        <div className='space-y-5'>
            <img src={swimmingImage} alt="" />
            <img src={classImage} alt="" />
            <img src={playImage} alt="" />
        </div>
      </div>
    );
};

export default QZone;