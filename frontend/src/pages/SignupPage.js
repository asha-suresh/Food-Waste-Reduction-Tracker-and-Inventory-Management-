import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LandingPageHeader from "../components/Header/LandingPageHeader";
import PostRequest from '../Service/PostRequest'

const SignupPage = () => {
  const navigate = useNavigate();

  const [username,setUsername ]=useState("")
  const [password,setPassword ]=useState("")
  const [email,setEmail ]=useState("")
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");


  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  // Validate email format
  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin=()=>{
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    // Perform validations
    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (isValid) {
      PostRequest('http://localhost:8080/api/create/account', { userName: username,password:password,email:email })
    .then(data => {
      PostRequest('http://localhost:8080/api/user/login', { userName: username,password:password })
      .then(data => {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userid", data.userId);
          localStorage.setItem("inventoryid", data.inventoryId);
          localStorage.setItem("username", data.userName);
          localStorage.setItem("role",data.userRole);
          navigate("/");
      });
    });}
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
              Sign up
              <br />
              <br />
              <input
                type="text"
                name="username"
                className={`bottom-border ${passwordError ? "input-error" : ""}`}
                placeholder="Username"
                value={username} onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }} required
              ></input>
                    {usernameError && <div className="error-message">{usernameError}</div>}

              <br />
              <br />
              <input
                type="text"
                name="Email"
                className={`bottom-border ${passwordError ? "input-error" : ""}`}
                placeholder="Email"
                value={email} onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }} required
              ></input>
                    {emailError && <div className="error-message">{emailError}</div>}

              <br />
              <br />
              <input
                type="password"
                name="password"
                className={`bottom-border ${passwordError ? "input-error" : ""}`}
                placeholder="Password"
                value={password} onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }} require
              ></input>
                    {passwordError && <div className="error-message">{passwordError}</div>}

              <div className="submit-btn" onClick={handleLogin}>
                Create Account
              </div>
              <br />
              <div className="login-footer-text">
                Have an Account? <span className="text-span" onClick={() => {
                                               navigate("/login");
                                                          }}>Click here to Login</span>
              </div>
              <br /> <br /> <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
