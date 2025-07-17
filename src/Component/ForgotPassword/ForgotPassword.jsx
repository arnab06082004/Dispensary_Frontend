import React, { useState } from "react";
import "./ForgotPassword.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = (props) => {
  const [myState, setMyState] = useState(1);
  const [inpField, setInpField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [handelBtn, setHandelBtn] = useState("Send OTP");

  const handleInpField = (event, key) => {
    setInpField({ ...inpField, [key]: event.target.value });
  };

  const sendOtp = async () => {
    if (inpField.email.trim() === "") return toast.error("Please enter email");
    props.showLoader();
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`, {
        email: inpField.email,
      })
      .then((response) => {
        setMyState(2);
        toast.success("OTP Sent to Your email Successfully");
        props.closeMode;
      })
      .catch((err) => {
        alert(err.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const verifyOtp = async () => {
    if (inpField.otp.trim() == "") return toast.error("Please enter OTP");
    props.showLoader();
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`, {
        email: inpField.email,
        otp: inpField.otp,
      })
      .then((response) => {
        setMyState(3);
        toast.success("OTP Verified Successfully");
        setHandelBtn("Enter new Password");
      })
      .catch((err) => {
        alert(err.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const resetPassword = async () => {
    if (inpField.newPassword.trim() == "")
      return toast.error("Please enter Password");
    if (inpField.newPassword.trim().length < 4)
      return toast.error("Password should be more than 3 characters");
    props.showLoader();
    await axios
     .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`, {

        email: inpField.email,
        newPassword: inpField.newPassword,
      })
      .then((response) => {
        toast.success("Password updated Successfully");
        props.onCancel();
      })
      .catch((err) => {
        toast.error(err.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const handleForgotBtn = async () => {
    if (myState == 1) await sendOtp();
    else if (myState == 2) await verifyOtp();
    else if (myState == 3) await resetPassword();
  };

  return (
    <div className="forgot-password">
      <div className="f-p-card">
        <div className="card-header">Reset Password</div>
        <div className="card-input">
          <input
            value={inpField.email}
            type="email"
            disabled={myState !== 1}
            onChange={(e) => {
              handleInpField(e, "email");
            }}
            className="card"
            placeholder="Enter email Id"
          />

          {(myState == 2 || myState == 3) && (
            <input
              value={inpField.otp}
              disabled={myState !== 2}
              type="text"
              onChange={(e) => {
                handleInpField(e, "otp");
              }}
              className="card"
              placeholder="Enter OTP"
            />
          )}
          {myState == 3 && (
            <input
              value={inpField.newPassword}
              onChange={(e) => {
                handleInpField(e, "newPassword");
              }}
              type="password"
              className="card"
              placeholder="New Password"
            />
          )}
        </div>
        <div className="forgot-btn">
          <button className="f-btn" onClick={handleForgotBtn}>
            {handelBtn}
          </button>
          <button className="f-btn" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
