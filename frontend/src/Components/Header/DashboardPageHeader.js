import React, { useState, useEffect, useRef } from 'react';
import Notifications from "react-notifications-menu";
import NotificationData from '../Notification/NotificationData';
import { useNavigate } from "react-router-dom";
import "./style.css";
import { FaSignOutAlt} from "react-icons/fa";



const DashboardPageHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };
  return (
    <div className='outlet-container'>
        <div className="dashboard-header-container">
            <div className="dashboard-header-name">Dashboard</div>
            <div className="dashboard-action-bar">
                <Notifications
                      data={NotificationData}
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
                <div className="action-icon" onClick={handleLogout}><FaSignOutAlt /></div>
            </div>
        </div>
        
    
    </div>
  )
}

export default DashboardPageHeader