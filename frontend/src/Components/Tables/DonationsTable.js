import React , { useEffect, useState } from 'react'
import DonationsTableRow from './DonationsTableRow'
import GetRequest from '../../Service/GetRequest';

const DonationsTable = () => {
    
const [donations,setDonations]=useState([]);
const [activeFilter, setActiveFilter]= useState("all");

  useEffect (()=>{
    fetchDonationItems("all");
  },[])


const fetchDonationItems= (condition)=>{
  const userId = localStorage.getItem("userid");
   GetRequest('view/all/donations?user_id='+userId+'&filterCondition='+condition)
    .then(data => {
        setDonations(data)
        setActiveFilter(condition)});
  }
  
  return (
    <div className="table-with-header-options">
      <div className="table-header-options">
        <div className="table-name">Donations</div>
        <div className="filter-options">
              <div className={`table-filter ${ activeFilter === "all" ? "active-filter" : ""}`} onClick={() => fetchDonationItems("all")}>All</div>
              <div className={`table-filter ${ activeFilter === "user" ? "active-filter" : ""}`} onClick={() => fetchDonationItems("user")}>Your Donations</div>
        </div>
      </div>
      <div className="table-container">
              <div className="donations-table-header">
                  <div className="table-column-title-slno">#</div>
                  <div className="donations-table-column-title">Food item</div>
                  <div className="donations-table-column-title">Location</div>
                  <div className="donations-table-column-title">Donated by</div>
                  <div className="donations-table-column-title">Expires on</div>
                  <div className="donations-table-column-title">Status</div>
                  <div className="donations-table-column-title">Actions</div>
              </div>
              <div className="table-body-content">

              {donations === null || donations.length === 0 ? (
                          <div className="centralise-content">No Donation items to display.</div>
                        ) : (
                          donations.map((item, index) => (
                            <DonationsTableRow key={item.id} slno={index + 1} {...item} />
                          ))
                        )}
      
              </div>
          </div>
      </div>
  )
}

export default DonationsTable