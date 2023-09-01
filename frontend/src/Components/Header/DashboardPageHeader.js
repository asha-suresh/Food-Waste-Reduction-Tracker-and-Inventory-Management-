import React, { useState, useEffect, useRef } from 'react';
import Notifications from "react-notifications-menu";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { FaSignOutAlt} from "react-icons/fa";
import GetRequest from '../../Service/GetRequest';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';




const DashboardPageHeader = ({activePath}) => {
  const navigate = useNavigate();

  const [notifications,setNotifications]=useState([]);


  const userId = localStorage.getItem("userid");

  useEffect (()=>{
    updateAllData();
    fetchNotifications();
    fetchAllNonAlertedNotifications();
    const fetchNotificationsInterval = setInterval(fetchAllNonAlertedNotifications, 60000);     // Fetch every 60 seconds
    
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(fetchNotificationsInterval);
    };
  },[])

  const updateAllData = () =>{
    GetRequest("update/all/foods?userId="+localStorage.getItem("userid"))
    .then(response=>{
        if(response){
          console.log("food items and all are updated")
        }
    })
  }
  
const fetchNotifications= async ()=>{
  await GetRequest('view/unread/notifications?userId='+userId)
    .then(data => {
      setNotifications(data)});
    }


const readAllNotifications= async ()=>{
  await GetRequest('update/notifications?userId='+userId)
    .then(data => {
      console.log(data)});
    }

const closeAlertAndUpdateAlertStatus= (notificationId)=>{
  GetRequest('update/notification/alerted/status?notificationId='+notificationId)
    .then(data => {
      console.log(data)});
    }

const fetchAllNonAlertedNotifications = ()=>{
   GetRequest('view/non/alerted/notifications?userId='+userId)
    .then(data => {
      data.forEach((notification, index) => {
        toast.success(notification.message, {
          closeButton: true, // or MyCustomCloseButton
          onClose: () => closeAlertAndUpdateAlertStatus(notification.id)
        });
      });});
  }

  const handleLogout = () => {
    localStorage.clear();
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
                          onClick: () => readAllNotifications()
                        }
                      }}
                      markAsRead={(data) => {
                        console.log(data);
                      }}
                    />
                    
                <div className="action-icon" onClick={handleLogout}> <FaSignOutAlt/> </div>
            </div>
        </div>
        <ToastContainer autoClose={false}/>
    </div>
  )
}

export default DashboardPageHeader