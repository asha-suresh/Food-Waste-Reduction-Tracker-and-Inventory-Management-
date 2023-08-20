import React , { useEffect, useState } from 'react'
import DonationsTableRow from './DonationsTableRow'
import GetRequest from '../../Service/GetRequest';

const DonationsTable = () => {
    
const [donations,setDonations]=useState([]);

  useEffect (()=>{
    fetchFoodItems();
  },[])


const fetchFoodItems= async ()=>{
  await GetRequest('view/all/donations')
    .then(data => {
        setDonations(data)});
  }
  
    if (donations === null || donations.length === 0) {
        return <p>No Donation items to display.</p>;
     }
     else {
  return (
    <div className="table-container">
            <div className="table-header">
                <div className="table-column-title">Sl.no</div>
                <div className="table-column-title">Food item</div>
                <div className="table-column-title">Category</div>
                <div className="table-column-title">Quantity</div>
                <div className="table-column-title">Donated by</div>
                <div className="table-column-title">Added on</div>
                <div className="table-column-title">Expires on</div>
                <div className="table-column-title">Status</div>
            </div>
            <div className="table-body-content">
    
            {donations.map((item,index) => ( <DonationsTableRow key={item.id} slno={index + 1} {...item}/> ))}
    
            </div>
        </div>
  )
}}

export default DonationsTable