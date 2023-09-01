import React, { useState, useEffect } from 'react'
import GetRequest from '../Service/GetRequest';
import NotificationCardView from '../components/Notification/NotificationCardView';

const NotificationPage = ({setActivePath}) => {
    
    const userId = localStorage.getItem("userid");

    const [allNotifications, setAllNotifications] = useState([]);

    useEffect(()=>{
        setActivePath("Notifications");

        GetRequest("view/notifications?userId="+userId)
           .then(response=>{
            setAllNotifications(response);
           })
    },[])


  return (
    <div className="outlet-container">
    {allNotifications.length === 0 ? (
                              <div className="centralise-content">There are no Notifications to display.</div>
                            ) : (
                                allNotifications.map((notification) => ( <NotificationCardView key={notification.id} {...notification}/> ))
                            )}
 
  </div> )
}

export default NotificationPage