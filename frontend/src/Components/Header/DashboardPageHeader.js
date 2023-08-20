import React, { useState, useEffect, useRef } from 'react';
import Notifications from "react-notifications-menu";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { FaSignOutAlt} from "react-icons/fa";
import GetRequest from '../../Service/GetRequest';
import "react-toastify/dist/ReactToastify.css";




const DashboardPageHeader = ({activePath}) => {
  const navigate = useNavigate();

  const [notifications,setNotifications]=useState([]);

  const userId = localStorage.getItem("userid");

  useEffect (()=>{
    fetchNotifications();
  },[])


const fetchNotifications= async ()=>{
  await GetRequest('view/unread/notifications?userId='+userId)
    .then(data => {
      setNotifications(data)});
  }

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };
  return (
    <div className='outlet-container'>
        <div className="dashboard-header-container">
            <div className="dashboard-header-name">{activePath}</div>
            <div className="dashboard-action-bar">
                
                 <Notifications
                      data={notifications}
                      header={{
                        title: <h4 className="notification_heading">Notifications</h4>,
                        option: {
                          text: <p className="mark_read">Mark all as read</p>,
                          onClick: () => console.log("Clicked")
                        }
                      }}
                      markAsRead={(data) => {
                        console.log(data);
                      }}
                    />
                <div className="action-icon" onClick={handleLogout}> <FaSignOutAlt/> </div>
            </div>
        </div>
    
    </div>
  )
}

export default DashboardPageHeader