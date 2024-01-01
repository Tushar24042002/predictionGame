import React, { useState } from "react";
import Classes from "../Registration/RegistrationForm.module.css";
import HeaderComponent from "../../components/Header/HeaderComponent";
import PrimaryButton from "../../components/ButtonSection/PrimaryButton/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { FaMobileAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { loginUser } from "./loginAction";
import Alertify from "alertifyjs";

const LoginForm = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    loginUser({ mobile: mobile, password: password }).then((res) => {
      console.log(res);
      if(res?.success){
        console.log("working");
        Alertify.success("Logged In Successfully");
        handleRedirect();
      }
      else{
        Alertify.error("Invalid Credientials");
      }
    }).catch((err)=>{
      Alertify.error(err);
    });
  };
  const handleRedirect = () => {
    // Redirect to the "/dashboard" route
    navigate('/');
  };
  return (
    <>
      <HeaderComponent label={"Login  "} />
      <section className={Classes.registrationForm}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label htmlFor="mobile">Your mobile</label>
                  <div className={`${Classes.inputClass}`}>
                    <span>
                      <FaMobileAlt />
                    </span>
                    <input
                      type="number"
                      id="mobile"
                      placeholder="Ex - 8882060228"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <div className={`${Classes.inputClass}`}>
                    <span>
                      <RiLockPasswordLine />
                    </span>

                    <input
                      type="password"
                      id="password"
                      placeholder="Ex - Abcd1234"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>

                <div className="w-100 mx-auto text-center mt-4">
                  <PrimaryButton
                    onClick={handleLogin}
                    label={"Login"}
                    style={{ width: "60%" }}
                  />
                </div>

                <p className="text-center mb-2 mt-3">
                  Forgot Password -{" "}
                  <a href="forgot_password.php" className="fw-bold text-body">
                    Click here
                  </a>
                </p>

                <p className="text-center mb-0">
                  Create Account -{" "}
                  <Link to={"/register"} className="fw-bold text-body">
                    Registration here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
