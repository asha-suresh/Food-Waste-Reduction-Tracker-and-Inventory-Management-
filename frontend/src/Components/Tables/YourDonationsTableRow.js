import React from 'react'

const YourDonationsTableRow = ({slno,id,foodName,category,quantity,createdDate,expiryDate,donationActive}) => {
    return (
      <div className={`collections-table-row ${donationActive === false ? "collections-table-row-inactive" : ""}`}>
                      <div className="table-row-data">{slno}</div>
                      <div className="table-row-data">{foodName}</div>
                      <div className="table-row-data">{category}</div>
                      <div className="table-row-data">{quantity}</div>
                      <div className="table-row-data">{createdDate}</div>   
                      <div className="table-row-data">{expiryDate}</div>  
                      <div className="table-row-data"> {donationActive === true ? (<span class="active-info-banner"> Active</span>) : <span class="expired-info-banner">Expired!</span> } </div>    
      </div>  
    )
  }

export default YourDonationsTableRow