import React, { useEffect, useState } from 'react';
import Timer from '../components/Timer/Timer';
import GameButtons from '../components/GameButtons/GameButtons';

const Home = () => {
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (!timerActive) {
      setTimerActive(true);
    }
  }, [timerActive]);

  function setTimerActiveFunction(data) {
    setTimerActive(data);
  }

  return (
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12' id='id_time'>
            <div className='d-flex align-items-center'>
              <div className='id_part'>
                <div className='form-group'>
                  <label>Period</label>
                  <h5>1345</h5>
                </div>
              </div>
              <div className='timer_part'>
                <div className='form-group'>
                  <label>Count Down</label>
                  <h5>
                    <Timer timerActive={timerActive} setTimerActive={setTimerActiveFunction} />
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-12'>
            <GameButtons/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
