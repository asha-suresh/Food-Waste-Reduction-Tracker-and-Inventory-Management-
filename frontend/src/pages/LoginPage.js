import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LandingPageHeader from "../components/Header/LandingPageHeader";
import PostRequest from '../Service/PostRequest'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username,setUsername ] = useState("")
  const [password,setPassword ]=useState("")
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin= async ()=>{
      setUsernameError("");
      setPasswordError("");
        // Perform validations
      let isValid = true;

      if (!username.trim()) {
        setUsernameError("Username is required");
        isValid = false;
      }

      if (!password.trim()) {
        setPasswordError("Password is required");
        isValid = false;
      }

      if (isValid) {
      await PostRequest('http://localhost:8080/api/user/login', { userName: username,password:password })
      .then(data => {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userid", data.userId);
          localStorage.setItem("inventoryid", data.inventoryId);
          localStorage.setItem("username", data.userName);
          localStorage.setItem("role",data.userRole);
      })
      const userRole = localStorage.getItem("role");
        if (userRole === "admin"){
          navigate("/admin");
        } else {
          navigate("/");
        }
  }; }

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
              Login
              <br />
              <br />

              <input
                type="text"
                name="username"
                className={`bottom-border ${passwordError ? "input-error" : ""}`}
                placeholder="Username"
                value={username} onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError(""); // Clear error when typing
                }} required
              ></input>
              {usernameError && <div className="error-message">{usernameError}</div>}

              <br />
              <br />
              <input
                type="password"
                name="password"
                className={`bottom-border ${passwordError ? "input-error" : ""}`}
                placeholder="Password"
                value={password} onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(""); // Clear error when typing
                }} require
              ></input>
              {passwordError && <div className="error-message">{passwordError}</div>}
              <span className="text-span" onClick={()=>{navigate('/forgot')}}>Forget password or username ?</span>
              
              <div className="submit-btn" onClick={handleLogin}>
                Login
              </div>
              <br />
              <div className="login-footer-text">
                Not a member? <span className="text-span" onClick={() => {
                                               navigate("/signup");
                                                          }}>Register now</span>
              </div>
              <br /> <br /> <br />
            </div>
          </div>
        </div>
        <ToastContainer closeButton={false}/>
      </div>
    </>
  );
};

export default LoginPage;
