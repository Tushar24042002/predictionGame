import React, { useEffect, useState } from "react";
import Classes from "./RegistrationForm.module.css";
import { FaMobileAlt, FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineRecommend } from "react-icons/md";
import PrimaryButton from "../../components/ButtonSection/PrimaryButton/PrimaryButton";
import HeaderComponent from "../../components/Header/HeaderComponent";
import { Link, useLocation } from "react-router-dom";
import Alertify from "alertifyjs";
import { adduser } from "./RegisterAction";
import { useNavigate } from "react-router-dom";
const RegistrationForm = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const re_code = queryParams.get("re_code");
  const [registrationForm, setRegistrationForm] = useState([
    {
      label: "Full Name",
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Ex  - John doe",
      icon: <FaRegUser />,
    },
    {
      label: "Mobile Number",
      id: "mobile",
      name: "mobile",
      type: "number",
      placeholder: "Ex  - 8882060228",
      icon: <FaMobileAlt />,
    },
    {
      label: "Password",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Ex - John@123",
      icon: <RiLockPasswordLine />,
    },
    {
      label: "Recommendation Code",
      id: "re_code",
      name: "re_code",
      type: "text",
      placeholder: "ABCD123",
      disabled: true,
      icon: <MdOutlineRecommend />,
    },
  ]);

  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setFormValues({
      ["re_code"]: re_code,
    });
  }, [re_code]);

  const handleInput = (e) => {
    let { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev, // Spread the previous state
      [name]: value, // Update the specific field with the new value
    }));
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    adduser(formValues)
      .then((res) => {
        console.log(res);
        if (res?.success) {
          setFormValues({});
          Alertify.success("Registration successful");
          navigate("/login");
        } else {
          setError(res);
          if (res?.error) {
            Alertify.error(res?.error);
          }
        }
      })
      .catch((err) => {
        Alertify.error("Registration failed. Please check your inputs.");
      });
  };
  return (
    <>
      <HeaderComponent label={"Registration "} />
      <section className={Classes.registrationForm}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <form>
                {registrationForm &&
                  registrationForm.map((data, index) => {
                    return (
                      <>
                        <div className="form-group mb-3" key={index}>
                          <label htmlFor={data.id}>{data.label}</label>
                          <div
                            className={`${Classes.inputClass} ${
                              data?.disabled ? Classes.disabledDiv : ""
                            }`}
                          >
                            <span>{data.icon}</span>
                            <input
                              type={data.type}
                              id={data.id}
                              disabled={data?.disabled}
                              name={data.name}
                              placeholder={data?.placeholder}
                              value={formValues[data?.name] || ""}
                              onInput={handleInput}
                            />
                          </div>
                          {error && (
                            <div style={{ color: "red" }}>
                              {error[data?.name]}
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })}

                <div className="w-100 mx-auto text-center mt-4">
                  <PrimaryButton
                    onClick={handleRegistration}
                    label={"Register"}
                    style={{ width: "60%" }}
                  />
                </div>

                <p
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "0",
                  }}
                >
                  Have already an account?{" "}
                  <Link to={"/login"} className="fw-bold text-body">
                    <u>Login here</u>
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

export default RegistrationForm;
