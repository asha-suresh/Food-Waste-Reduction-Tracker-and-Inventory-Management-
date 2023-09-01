import React from 'react'

export const QuickSearchFilterResultCard = ({id,foodName,category,createdDate,expiryDate,quantity,status}) => {
  return (
    <div className="donations-table-row">
                    <div className="table-row-data-block">
                        <div className="donating-food-item-name">{foodName}</div>
                        <div className="donating-food-item-category">{category}</div>
                        <div className="donating-food-item-quantity">Added on : {createdDate} </div>
                      </div>
                    <div className="table-row-data-block">
                        <div className="donated-by">Quantity :{quantity}</div>
                    </div>
                    <div className="table-row-data-block">
                        <div className="donating-food-item-name">{status}</div>
                        <div className="donating-food-item-category">Expiry Date: {expiryDate}</div>
                      </div>
</div>
  )
}
