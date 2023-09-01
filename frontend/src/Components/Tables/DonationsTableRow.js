import React, { useEffect, useState } from 'react'
import {FaEnvelopeOpenText, FaMailchimp, FaRegClock, FaUser, FaUserCheck, FaUserCircle, FaUserSecret } from "react-icons/fa";
import GetRequest from '../../Service/GetRequest';

const DonationsTableRow = ({slno,id,foodName,category,quantity,createdDate,expiryDate,userName,email,donationActive,userId,acceptanceRequestedUserids}) => {

  const currentUserId = localStorage.getItem("userid");

  const isCurrentUserDonated = String(userId) === currentUserId;

 
  console.log(typeof acceptanceRequestedUserids);
  console.log(typeof currentUserId);
  
  const clickOnAcceptDonation= async ()=>{
       GetRequest('accept/donation?userId='+currentUserId+'&donationId='+id)
        .then(data => {
          console.log(data)});
    }


    let content;
    if (isCurrentUserDonated) {
            content = <div>No actions</div>
    } else {
        if(donationActive === true){
            if (acceptanceRequestedUserids.some(id => id === Number(currentUserId))) {
                  content = <div>Requested</div> }
            else {
                  content = <div className="accept-donation-btn" onClick={clickOnAcceptDonation}> Accept Donation</div>
            } 
          } else {
            content =  <div className="accept-donation-btn btn-inactive">Accept Donation</div>
            }
        }

  return (
    <div className="donations-table-row">
                    <div className="table-row-data-slno">{slno}</div>
                    <div className="table-row-data-block">
                        <div className="donating-food-item-name">{foodName}</div>
                        <div className="donating-food-item-category">Category: {category}</div>
                        <div className="donating-food-item-quantity">{quantity}  quantity</div>
                      </div>
                    <div className="table-row-data-block">###</div>
                    {isCurrentUserDonated ? (
                      <div className="table-row-data-block">
                      <div className="donation-created-date">Donated By yourself</div>
                      <div className="donation-created-date">Added on: {createdDate}</div>
                      </div>
                    ):(
                      <div className="table-row-data-block">
                      <div className="donated-by"><FaUserCheck/>{userName}</div>
                      <div className="donated-user-email">{email}</div>
                      <div className="donation-created-date">Added on: {createdDate}</div>
                  </div>
                    )}
                    
                    <div className="table-row-data-block">{expiryDate}</div>  
                    <div className="table-row-data-block"> {donationActive === true ? (<span class="active-info-banner"> Active</span>) : (<span class="expired-info-banner">Closed</span>) } </div>
                    <div className="table-row-data-block">
                        {content}
                    </div>
   
    </div>  
  )
}

export default DonationsTableRow