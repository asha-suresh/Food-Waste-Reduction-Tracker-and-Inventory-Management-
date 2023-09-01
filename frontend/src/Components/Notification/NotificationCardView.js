import React from 'react'
import './style.css'


const NotificationCardView = ({id,notificationTitle,message,createdDate,readByUser}) => {
  return (
    <div className="notification-card-view">
        <div className="notification-info-banner"></div>
        <div className="notification-content-body">
            <div className="notification-title">{notificationTitle}</div>
            <div className="notification-message-body">{message}</div>
            <div className="notification-footer">
                <div className="notificaion-recieved-time">Notification Created on: {createdDate}</div>
                <div className="notification-action"></div>
            </div>
        </div>
    </div>
  )
}

export default NotificationCardView