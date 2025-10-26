import React from 'react';
import swimmingImage from '../../assets/swimming.png'
import classImage from '../../assets/classImage.png'
import playImage from '../../assets/playImage.png'

const QZone = () => {
    return (
      <div>
          <div className='font-bold mt-8'>
            <h2>QZone</h2>
        </div>
        <div>
            <img src={swimmingImage} alt="" />
            <img src={classImage} alt="" />
            <img src={playImage} alt="" />
        </div>
      </div>
    );
};

export default QZone;