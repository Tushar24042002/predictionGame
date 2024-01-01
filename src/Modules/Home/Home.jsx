import React, { useEffect, useRef, useState } from "react";
import Timer from "../../components/Timer/Timer";
import GameButtons from "../../components/GameButtons/GameButtons";
import RandomColorSelector from "../../components/RandomColorSelector/RandomColorSelector";
import HomeBalance from "../../components/HomeBalance/HomeBalance";
import Classes from "./Home.module.css";
import DataLoader from "../../DataLoader";
import { userInfo } from "./HomeAction";
import AddMatch from "./AddMatch";

import { insertData } from "../../components/GameButtons/gameActions";
import GameComponent from "../../components/Timer/GameComponent";
import Share from "./Share";
import alertify from "alertifyjs";
import PaginatedTable from "../../components/PaginatedTable/PaginatedTable";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calculateResultRef = useRef();
  const [calculateResult, setCalculateResult] = useState(false);
  const [userAmount, setUserAmount] = useState(0);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [userSelectedInfo, setUserSelectedInfo] = useState({});
  const [total, setTotal] = useState(0);
  const [shareModal, setShareModal] = useState(false);
  const [gameRecord, setGameRecord] = useState([]);

  useEffect(() => {
    callUserInfo();
    fetchRecord();
  }, []);
  const callUserInfo = () => {
    userInfo()
      .then((res) => {
        setUserAmount(Number(res?.balance) || 0);
        setUserId(res?.userId);
        setUser(res || {});
      })
      .then((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (calculateResult === true) {
      calculateResultRef.current.calculateResultRefFunction();
      setCalculateResult(false);
    }
  }, [calculateResult]);

  const handleGameColor = async (totalMoney) => {
    const currentTimestamp = new Date().getTime();

    // alertify.error("Cancelled");

    insertData(totalMoney, userId, userSelectedInfo?.id, currentTimestamp)
      .then((res) => {
        if (res?.success) {
          callUserInfo();
          fetchRecord();
          setIsModalOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAndUpdateGameEntries = async () => {
    try {
      const response = await fetch("https://game.capitallooks.com/php/update_result.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      alertify.success("Result Updated");
      fetchRecord();
      // Handle the response, you can log or perform other actions based on the data
    } catch (error) {
      console.error("Error updating game entries:", error);
    }
  };

  //  user result
  const fetchRecord = () => {
    fetch('https://game.capitallooks.com/php/user_result.php')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the data to the console
    // Handle the data as needed
    setGameRecord(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Handle errors
  });

  };

  const getColor = (data) => {
    switch (data) {
      case 0:
        return "Blue";
      case 1:
        return "Green";
      case 2:
        return "Red";
        default :
        return "";
    }
  };

  const columns = [
    { Header: 'Period', accessor: 'timeInterval' },
    { Header: 'Your Selection', accessor: 'colorCode' },
    { Header: 'Amount', accessor: 'amount' },
    { Header: 'Result', accessor: 'result' },
  ];
  return (
    <>
      {shareModal && (
        <Share
          closeModal={setShareModal}
          url={`https://game.capitallooks.com/register?re_code=${user?.recommend_code}`}
          title={"Share Game"}
        />
      )}
      {isModalOpen && (
        <AddMatch
          userAmount={userAmount}
          setTotalAmount={setTotal}
          headerStyle={userSelectedInfo?.style}
          label={userSelectedInfo?.label}
          onClick={handleGameColor}
          setModalOpen={setIsModalOpen}
        />
      )}
      <HomeBalance setShareModal={setShareModal} balance={userAmount} />
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
                      <GameComponent callFunction={fetchAndUpdateGameEntries} />
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <GameButtons
                setUserSelectedInfo={setUserSelectedInfo}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </div>
        </div>
      </section>

      <RandomColorSelector
        userAmount={userAmount}
        setUserAmount={setUserAmount}
        calculateResultRef={calculateResultRef}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
          <PaginatedTable data={gameRecord} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
