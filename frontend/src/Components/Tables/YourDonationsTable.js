import React , { useEffect, useState } from 'react'
import GetRequest from '../../Service/GetRequest';
import YourDonationsTableRow from './YourDonationsTableRow';


const YourDonationsTable = () => {

    const userId = localStorage.getItem("userid");
    const [donations,setDonations]=useState([]);

    useEffect (()=>{
        fetchYourDonations();
      },[])
    
    
    const fetchYourDonations= async ()=>{
      await GetRequest('view/donations?user_id='+userId)
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
                <div className="table-column-title">Added on</div>
                <div className="table-column-title">Expires on</div>
                <div className="table-column-title">Status</div>
            </div>
            <div className="table-body-content">
    
            {donations.map((item,index) => ( <YourDonationsTableRow key={item.id} slno={index + 1} {...item}/> ))}
    
            </div>
        </div>
        )
        }
}

export default YourDonationsTable