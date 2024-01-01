import React from "react";
import Classes from "./HomeBalance.module.css";
import PrimaryButton from "../ButtonSection/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router";
import SecondaryButton from "../ButtonSection/SecondaryButton/SecondaryButton";

const HomeBalance = ({balance, setShareModal}) => {
  const navigate = useNavigate();
  return (
    <section className={Classes.homeBalance}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className={Classes.balanceSection}>
                <h5>Available Balance : ₹ {balance || 0}</h5>
            </div>
            <div className={Classes.rechargebtnSection}>
                <PrimaryButton onClick={()=>navigate("/rechargeWallet")} label={"recharge"} />
                <SecondaryButton onClick={()=>setShareModal(true)} label={"Share"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBalance;
