import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Classes from "./AddMatch.module.css";
import SecondaryButton from "../../components/ButtonSection/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../components/ButtonSection/PrimaryButton/PrimaryButton";
import alertify from "alertifyjs";


const AddMatch = ({
  headerStyle,
  setModalOpen,
  onClick,
  label,
  userAmount,
}) => {
  const [amount, setAmount] = useState([10, 100, 1000, 10000]);
  const [selectAmount, setSelectAmount] = useState(10);
  const [quantity, setQuantity] = useState(1);

  const manageAmount = (data) => {
    setSelectAmount(data);
  };

  const handleQuantity = (data) => {
    setQuantity((prev) => (prev + data < 1 ? 1 : prev + data));
  };
  return (
    <Modal>
      <div className={Classes.addAmountModal}>
        <div className={Classes.headerPart} style={headerStyle}>
          <h5>{label && label}</h5>
        </div>
        <div className={Classes.bodyPart}>
          <div className={Classes.amountSec}>
            <label>Contract Money</label>
            <ul>
              {amount &&
                amount.map((data, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        selectAmount === data ? Classes.activeAmount : ""
                      }
                      onClick={() => manageAmount(data)}
                    >
                      {data}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={Classes.quantitySec}>
            <label>Quantity</label>
            <div className={`d-flex align-items-center ${Classes.gap_20} `}>
              <div
                className={Classes.quantityBtn}
                onClick={() => handleQuantity(-1)}
              >
                {" "}
                -{" "}
              </div>
              <div className={Classes.viewQuantity}> {quantity} </div>
              <div
                className={Classes.quantityBtn}
                onClick={() => handleQuantity(1)}
              >
                {" "}
                +{" "}
              </div>
            </div>
          </div>

          <div className={Classes.total}>
            <h6>
              Total Contract Money - <span>{quantity * selectAmount}</span>
            </h6>
          </div>
          <div className={`d-flex mt-3 align-items-center ${Classes.gap_20}`}>
            <SecondaryButton
              label={"Cancel"}
              onClick={() => setModalOpen(false)}
            />
            <PrimaryButton
              label={"Confirm"}
              onClick={() =>
                userAmount < (quantity * selectAmount)
                  ? alertify.error("Please Recharge Your Account")
                  : onClick(quantity * selectAmount)
              }
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddMatch;
