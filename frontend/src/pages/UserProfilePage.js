import React, { useEffect, useState } from 'react'
import { FaSave } from 'react-icons/fa';
import GetRequest from '../Service/GetRequest';

const UserProfilePage = ({setActivePath}) => {
    
    const userID = localStorage.getItem("userid");
    const [username, setUsername]= useState("");
    const[email,SetEmail]=useState("");
    const [phoneNumber, setPhoneNumber]=useState("");
    const [houseNo, setHouseName]=useState("");
    const [streetOrCityName, setStreetOrCityName]=useState("");
    const [pinCode, setPinCode]=useState("");
    const [password, setPassword] =useState("");

    //for getting default user contact and address for communication
    useEffect(()=>{
      setActivePath("Profile")
      GetRequest("view/user/details?userId="+userID)
          .then(data=>{
              setPhoneNumber(data.phoneNo);
              setHouseName(data.houseNo);
              setStreetOrCityName(data.streetOrCityName);
              setPinCode(data.pinCode);
              setUsername(data.userName);
              SetEmail(data.email);
          });  },[])       

   
  return (
    <div className="outlet-container">
      <br/>
      User name : {username}<br/>
                Email: {email}<br/>


                Phone Number <input
                            type="text"
                            name="Phone Number"
                            placeholder="Phone Number"
                            className="custom-input"
                            value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} required
                    ></input>  <br/>
                    Address Line 1 : <input
                            type="text"
                            name="Address Line 1"
                            placeholder="Address Line 1"
                            className="custom-input"
                            value={houseNo} onChange={(e)=>{setHouseName(e.target.value)}} required
                    ></input>   <br/>
                    Address Line 2 :  <input
                            type="text"
                            name="Address Line 2 :"
                            placeholder="Address Line 2 :"
                            className="custom-input"
                            value={streetOrCityName} onChange={(e)=>{setStreetOrCityName(e.target.value)}} required
                    ></input>   <br/>
                    Pincode <input
                            type="text"
                            name="Pincode"
                            placeholder="Pincode"
                            className="custom-input"
                            value={pinCode} onChange={(e)=>{setPinCode(e.target.value)}} required
                    ></input>  <br/>  
  
                    Password <input
                            type="text"
                            name="Password"
                            placeholder="Password"
                            className="custom-input"
                            value={password} onChange={(e)=>{setPassword(e.target.value)}} required
                    ></input> 
                    <div className="modal-footer">
                    <div className="modal-footer-primary-action" ><FaSave/>Update Profile</div>
                </div>
        </div>
  )
}

export default UserProfilePage