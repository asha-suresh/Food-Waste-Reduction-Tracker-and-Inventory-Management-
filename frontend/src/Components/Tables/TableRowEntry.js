import React from 'react'
import './style.css'

const TableRowEntry = ({foodName,quantity,createdDate,expiryDate}) => {
  return (
    <div className="collections-table-row">
            <div className="table-row-data">1</div>
            <div className="table-row-data">{foodName}</div>
            <div className="table-row-data">{quantity}</div>
            <div className="table-row-data">{createdDate}</div>
            <div className="table-row-data">{expiryDate}</div>   
            <div className="table-row-data">Expiring soon</div>    
    </div>
    )
}

export default TableRowEntry