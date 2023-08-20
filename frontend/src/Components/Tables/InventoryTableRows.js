import React from 'react'

const InventoryTableRows = ({slno,foodName,category,quantity,consumedQuantity,updatedDate,expiryDate,status}) => {
  return (
        <div className="collections-table-row">
                    <div className="table-row-data">{slno}</div>
                    <div className="table-row-data">{foodName}</div>
                    <div className="table-row-data">{category}</div>
                    <div className="table-row-data">{quantity}</div>
                    <div className="table-row-data">{consumedQuantity}</div>
                    <div className="table-row-data">{updatedDate}</div>   
                    <div className="table-row-data">{expiryDate}</div>  
                    <div className="table-row-data">{status}</div>    
  
            </div>  
    )
}

export default InventoryTableRows

                