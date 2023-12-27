import React from 'react';
import { insertData } from './gameActions';

const GameButtons = () => {
  const handleGameColor = async(colorCode) => {
    try {
        await insertData(colorCode);
      } catch (error) {
        // Handle error if needed
      }
  };

  return (
    <div className='d-flex align-items-center'>
      <div className='btn-group'>
        <div className='btn btn-primary' onClick={() => handleGameColor(0)}>Join Green</div>
      </div>
      <div className='btn-group'>
        <div className='btn btn-primary' onClick={() => handleGameColor(1)}>Join Green</div>
      </div>
      <div className='btn-group'>
        <div className='btn btn-primary' onClick={() => handleGameColor(2)}>Join Green</div>
      </div>
    </div>
  );
};

export default GameButtons;
