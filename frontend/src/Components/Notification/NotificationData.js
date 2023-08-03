import React from 'react';
import './style.css'; // Import the CSS file for the notification banner styles

const NotificationData = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOALqcMjby_cOSIr-3GFWRO_zY_j0qcB4zRA&usqp=CAU",
      message: (
        <div>
          <div className="displayflex">
            <div className="username"> James Diase </div>
            <div className="time"> less than a minute ago </div>
          </div>
          <div className=" displayflex ">
            <div className=" displayflex call">
              Missed call
              <div className=" call__message">
                --- I'll be in your neighbourhood.....
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg",
      message: (
        <div>
          <div className="displayflex">
            <div className="username"> James Diase </div>
            <div className="time"> 10 minutes ago </div>
          </div>
          <div className=" displayflex ">
            <div className=" displayflex call">
              Missed call
              <div className=" call__message">
                --- I'll be in your neighbourhood.....
              </div>
            </div>
          </div>
        </div>
      )
    },
    {}
  ];

  export default NotificationData;