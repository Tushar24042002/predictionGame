import React, { useEffect, useState } from "react";
import Classes from "../Registration/RegistrationForm.module.css";
import { userInfo } from "../Home/HomeAction";
import HeaderComponent from "../../components/Header/HeaderComponent";
import { CiWallet } from "react-icons/ci";
import PrimaryButton from "../../components/ButtonSection/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/ButtonSection/SecondaryButton/SecondaryButton";
import alertify from "alertifyjs";
import { useNavigate } from "react-router";

const WalletPayment = () => {
  const navigate= useNavigate();
  const [amount, setAmount] = useState(100);
  const [orderId, setOrderId] = useState(98765);
  const [userAmount, setUserAmount] = useState(0);
  const [userId, setUserId] = useState("");
  const [suggestAmount, setSuggestAmount] = useState([
    10, 20, 50, 100, 200, 250,
  ]);

  useEffect(() => {
    callUserInfo();
  }, []);
  const callUserInfo = () => {
    userInfo()
      .then((res) => {
        setUserAmount(Number(res?.balance) || 0);
        setUserId(res?.userId);
      })
      .then((err) => {
        console.log(err);
      });
  };

  const handlePayment = async () => {
    if(amount < 10){
      alertify.error("Amount should be greater than 10");
      return;
    }
    try {
      // Request to create a Razorpay order
      const response = await fetch("https://game.capitallooks.com/php/walletpayment.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      console.log(data);
      if (data.orderId) {
        setOrderId(data.orderId);

        // Use Razorpay's checkout.js to handle the payment
        const options = {
          key: "rzp_test_eCSo0HgQUUjnNb",
          amount: amount * 100,
          currency: "INR",
          name: "Predict Game",
          description: "Wallet Top-up",
          order_id: data.orderId,
          handler: function (response) {
            // Handle the success of the payment
            callUserInfo();
            alertify.success("Your Amount is added on your wallet");
            navigate("/");
            // You can update the UI or perform additional actions here
          },
          prefill: {
            name: "User Name",
            email: "user@example.com",
            contact: "9876543210",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Error creating order");
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <>
      <HeaderComponent label={"Recharge"} />

      <section className={Classes.registrationForm}>
        <div className="container-fluid">
          <div className="row mb-4 mt-2">
            <div className="col-lg-12">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Available Balance : {userAmount}</h5>
                <SecondaryButton label={"Recharge History"} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className={`${Classes.inputClass}`}>
                <span>
                  <CiWallet />
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={"mt-4 row"}>
            {suggestAmount &&
              suggestAmount?.map((data, index) => {
                return (
                  <div className="col-lg-4 mb-3 text-center">
                    <SecondaryButton
                      style={{ width: "80%" }}
                      label={data}
                      onClick={() => setAmount(data)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="col-lg-12 mt-4 text-center">
            <PrimaryButton
            disabled={amount === 0 || amount === null}
              style={{ width: "60%", margin: "auto" }}
              onClick={handlePayment}
              label={"Add Amount"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WalletPayment;
