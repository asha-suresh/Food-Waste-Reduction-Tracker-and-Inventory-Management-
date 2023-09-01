import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LandingPageHeader from "../components/Header/LandingPageHeader";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import GetRequest from "../Service/GetRequest";


const ForgetPasswordPage = () => {
    const navigate = useNavigate();

    const [email,setEmail ] = useState("")
    const [emailError, setEmailError] = useState("");

    // Validate email format
  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

    const resetLoginPassword = async ()=>{
        setEmailError("");

        // Perform email validation
        if (!email.trim()) {
        setEmailError("Email is required");
        } else if (!isValidEmail(email)) {
        setEmailError("Invalid email format");
        } else {
            await GetRequest("forget/password?emailId="+email)
            .then(data=>{
                console.log(data);
                toast.info(data);
            });      
        }
    }

  return (
    <>
      <div>
        <LandingPageHeader/>
        <br />
        <br />
        <div className="main_container">
          <div className="slogenbox">
            <div className="slogen1"> FOOD WASTE REDUCTION TRACKER </div>
            <br />
            <div className="horizontal-line"></div>
            <div className="slogen2">
              {" "}
              "From Waste to Wonder: Reducing Food Waste, Managing Costs, and
              Sharing the Bounty with Those in Need"{" "}
            </div>
            <div className="footer-image"></div>
          </div>
          <div className="loginbox">
            <div className="login-box-wrap">
              <br />
              <br />
              Remember Password or Username?
              <br /> <br /> <br />
              Your credentials will be sent through email.
              <br />

              <input
                type="text"
                name="Email"
                className={`bottom-border ${emailError ? "input-error" : ""}`}
                placeholder="Please Enter your Email"
                value={email} onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }} required
              ></input>
                    {emailError && <div className="error-message">{emailError}</div>}

              <br />
           
              
              <div className="submit-btn" onClick={resetLoginPassword} >
                Reset
              </div>
              <br />
              <div className="login-footer-text">
                Back to Login? <span className="text-span" onClick={() => {
                                               navigate("/login");
                                                          }}>Click here to login</span>
              </div>
              <br /> <br /> <br />
            </div>
          </div>
        </div>
        <ToastContainer closeButton={false}/>
      </div>
    </>
  )
}

export default ForgetPasswordPage