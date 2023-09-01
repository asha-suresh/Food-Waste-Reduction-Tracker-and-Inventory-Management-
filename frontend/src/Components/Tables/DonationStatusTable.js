import React, { useEffect, useState } from 'react'
import DonationStatusTableRow from './DonationStatusTableRow'
import GetRequest from '../../Service/GetRequest';

const DonationStatusTable = () => {

  const [donationstatusList,setDonationstatusList]=useState([]);
  const [renderRequired, setRenderRequired] = useState(false);
  const [activeFilter, setActiveFilter]= useState("active");


  // Callback function to update notificationData from child
  const handleUpdate = () => {
    // Perform data update logic here
    FetchAllDonationStatus("active");
  };

  const FetchAllDonationStatus =(condition) =>{
    const userId = localStorage.getItem("userid");
    GetRequest('view/all/donation/status?userId='+userId+'&filterCondition='+condition)
    .then(data => {
      setDonationstatusList(data)
      setActiveFilter(condition)});
  }


  useEffect (()=>{
    FetchAllDonationStatus("active");
   },[renderRequired])
         


  return (
    <div className="table-with-header-options">
      <div className="table-header-options">
        <div className="table-name">Your Donation Activities</div>
        <div className="filter-options">
              <div className={`table-filter ${ activeFilter === "active" ? "active-filter" : ""}`} onClick={() => FetchAllDonationStatus("active")}>Active</div>
              <div className={`table-filter ${ activeFilter === "completed" ? "active-filter" : ""}`} onClick={() => FetchAllDonationStatus("completed")}>Completed</div>
        </div>
      </div>
    <div className="table-container">
    <div className="table-header">
        <div className="table-column-title">#</div>
        <div className="table-column-title">Donation</div>
        <div className="table-column-title">Details</div>
        <div className="table-column-title">Status</div>
        <div className="table-column-title">Actions</div>
    </div>
    <div className="table-body-content">

    {donationstatusList === null || donationstatusList.length === 0 ? (
                                  <div className="centralise-content">No Activites.</div>
                                ) : (
                                  donationstatusList.map((item,index) => ( <DonationStatusTableRow key={item.id} slno={index + 1} {...item} onUpdate={handleUpdate}/> ))
                                )}

    </div>
</div>
</div>
  )
}

export default DonationStatusTable