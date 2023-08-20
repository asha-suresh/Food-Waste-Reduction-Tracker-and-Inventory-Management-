import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import { useNavigate } from "react-router-dom";


const Notifications = () => {


  const navigate = useNavigate();



  const handleTextInput = () => {
    navigate("/login");
  }


    
    return (
    <div>Notifications <br/>

        
        <div className="submit-btn" onClick={handleTextInput}> submit </div>
        <ToastContainer />

</div>
  )
}

export default Notifications