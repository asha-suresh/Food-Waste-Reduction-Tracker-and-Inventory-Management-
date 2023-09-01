import React, { useEffect, useState } from 'react'
import GetRequest from '../../Service/GetRequest';

const FoodItemStatusAnalyticsCard = () => {

    const userId = localStorage.getItem("userid");
    const inventoryId = localStorage.getItem("inventoryid");

    const [safeFoodCount, setSafeFoodCount] =useState();
    const [donatedCount, setDonatedCount] =useState();
    const [consumedCount, setConsumedCount] =useState();
    const [expiredCount, setExpiredCount] =useState();
    const [warningCount, setWarningCount] =useState();

    useEffect(()=>{
        GetRequest("food/status/analytics?userId="+userId)
        .then(response=>{
            if(response){
              setSafeFoodCount(response.safeFoodCount)
              setConsumedCount(response.consumedCount)
              setDonatedCount(response.donatedCount)
              setExpiredCount(response.expiredCount)
              setWarningCount(response.warningCount)
            }
        })
    },[])
  return (
    <div>
        <div className="food-status-quick-info-container">
              <h4>Food Items Status</h4><br/>
            <div className="area-flex"><div className="info-small-box green-box"></div> <div className="info-text">Safe to consume: <span class="bold-text">{safeFoodCount}</span></div></div>
            <div className="area-flex"><div className="info-small-box"></div><div className="info-text">Donated: <span class="bold-text">{donatedCount}</span></div></div>
            <div className="area-flex"><div className="info-small-box"></div><div className="info-text">Consumed: <span class="bold-text">{consumedCount}</span></div></div>
            <div className="area-flex"><div className="info-small-box red-box"></div><div className="info-text">Expired: <span class="bold-text">{expiredCount}</span></div></div>
            <div className="area-flex"><div className="info-small-box"></div><div className="info-text">Expiring soon: <span class="bold-text">{warningCount}</span></div></div>
            </div>
    </div>
  )
}

export default FoodItemStatusAnalyticsCard