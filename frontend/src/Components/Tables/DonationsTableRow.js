import React from 'react'
import {FaEnvelopeOpenText, FaRegClock } from "react-icons/fa";

const DonationsTableRow = ({slno,id,foodName,category,quantity,addedOn,expiresAt,userName,email,donationActive}) => {
  return (
    <div className="collections-table-row">
                    <div className="table-row-data">{slno}</div>
                    <div className="table-row-data">{foodName}</div>
                    <div className="table-row-data">{category}</div>
                    <div className="table-row-data">{quantity}</div>
                    <div className="table-row-data tooltip">{userName} <FaEnvelopeOpenText/><span class="tooltiptext">{email}</span> </div>
                    <div className="table-row-data">{addedOn}</div>   
                    <div className="table-row-data">{expiresAt}</div>  
                    <div className="table-row-data"> {donationActive === true ? (<span class="active-info-banner"> Active</span>) : <span class="expired-info-banner">Expired!</span> } </div>    
    </div>  
  )
}

export default DonationsTableRow