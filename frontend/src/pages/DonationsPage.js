import React, { useEffect, useState } from "react";
import './style.css'
import DonationsTable from "../components/Tables/DonationsTable";
import DonationStatusTable from "../components/Tables/DonationStatusTable";
import { Chart } from "react-google-charts";
import GetRequest from "../Service/GetRequest";


const DonationsPage = ({ setActivePath }) => {

const [graphData,setGraphData] = useState([]);


const options = {
  chart: {
    title: "Your Donations",
    subtitle: "Successful/completed, pending Donations",
  },
};

  const fetchGraphData = () =>{
    const userId = localStorage.getItem("userid");
    GetRequest("get/donation/monthly/analytics?userId="+userId)
           .then(response=>{
               if(response){
                  // Formatting the data for visualization
                  const formattedData = response.map(item => [
                    item.month,
                    item.inactive,
                    item.activeDonation
                  ]);
                  // Adding header row
                  formattedData.unshift(['Month', 'SuccessFul', 'pending']);
                  setGraphData(formattedData);
               }
           })
  }

    useEffect(() => {
        setActivePath("Donations");
        fetchGraphData();
      }, []);

      
  return (
    <div className="outlet-container">
    <div className="donations-graphical-area">
    <div className="dashboard-column-2">
          <div className="dashboard-info-row padding-main">

          {graphData === null || graphData.length === 0 ? (
                          <div className="centralise-content">No Donations Found.</div>
                        ) : (
                          <Chart
                          chartType="Bar"
                          width="100%"
                          height="300px"
                          data={graphData}
                          options={options}
                        />)}
          
          </div>
        </div>
        <div className="left-side-table"><DonationStatusTable/></div>
        
      </div>
      <div className="dashboard-table-section">
      <DonationsTable/>
      </div>
    </div>
  )
}

export default DonationsPage