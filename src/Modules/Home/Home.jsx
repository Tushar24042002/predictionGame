import React, { useEffect, useRef, useState } from "react";
import Timer from "../../components/Timer/Timer";
import GameButtons from "../../components/GameButtons/GameButtons";
import RandomColorSelector from "../../components/RandomColorSelector/RandomColorSelector";
import HomeBalance from "../../components/HomeBalance/HomeBalance";
import Classes from "./Home.module.css";

const Home = () => {
  const calculateResultRef = useRef();
  const [calculateResult, setCalculateResult] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [userAmount, setUserAmount] = useState(100);

  useEffect(() => {
    if (!timerActive) {
      setTimerActive(true);
    }
  }, [timerActive]);

  useEffect(() => {
    if (calculateResult === true) {
      calculateResultRef.current.calculateResultRefFunction();
      setCalculateResult(false);
    }
  }, [calculateResult]);

  return (
    <>
    <HomeBalance balance={userAmount}/>
      <section className={Classes.homeSection}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12" id={Classes.id_time}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="id_part">
                  <div className="form-group">
                    <label>Period</label>
                    <h5>1345</h5>
                  </div>
                </div>
                <div className="timer_part">
                  <div className="form-group">
                    <label>Count Down</label>
                    <h5>
                      <Timer
                        setCalculateResult={setCalculateResult}
                        timerActive={timerActive}
                      />
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <GameButtons />
            </div>
          </div>
        </div>
      </section>
      <RandomColorSelector userAmount={userAmount} setUserAmount={setUserAmount} calculateResultRef={calculateResultRef}  />
    </>
  );
};

export default Home;
