import React from "react";
import Classes from "./HomeBalance.module.css";
import PrimaryButton from "../ButtonSection/PrimaryButton/PrimaryButton";

const HomeBalance = ({balance}) => {
  return (
    <section className={Classes.homeBalance}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className={Classes.balanceSection}>
                <h5>Available Balance : ₹ {balance || 0}</h5>
            </div>
            <div className={Classes.rechargebtnSection}>
                <PrimaryButton label={"recharge"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBalance;
