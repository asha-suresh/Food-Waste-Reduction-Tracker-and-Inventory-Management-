import React, { useState } from "react";


import { useNavigate } from "react-router-dom";
import "./style.css";
import LandingPageHeader from "../components/Header/LandingPageHeader";
import PostRequest from '../Service/PostRequest'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import GetRequest from "../Service/GetRequest";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username,setUsername ] = useState("")
  const [password,setPassword ]=useState("")

  const [isLoggedIn, setIsLoggedIn] = useState( localStorage.getItem("isLoggedIn"));

  const handleLogin=()=>{
      PostRequest('http://localhost:8080/api/user/login', { userName: username,password:password })
    .then(data => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userid", data.userId);
        localStorage.setItem("inventoryid", data.inventoryId);
        localStorage.setItem("username", data.userName);
    })

    GetRequest("update/all/foods?userId="+localStorage.getItem("userid"))
        .then(response=>{
            if(response){
              console.log("food items and all are updated")
            }
        })
        navigate("/");
  };

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
                className="bottom-border"
                placeholder="Username"
                value={username} onChange={(e)=>{setUsername(e.target.value)}} required
              ></input>

              <br />
              <br />
              <input
                type="password"
                name="password"
                className="bottom-border"
                placeholder="Password"
                value={password} onChange={(e)=>{setPassword(e.target.value)}} require
              ></input>
              
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
