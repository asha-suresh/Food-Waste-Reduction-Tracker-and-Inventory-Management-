import React, { useEffect, useState } from 'react'
import GetRequest from '../../Service/GetRequest'
import { Chart } from "react-google-charts";


const DashbaordPieChartAnalyticsCard = () => {

    const userId = localStorage.getItem("userid");
    const [isDataRecievedFromBacken, setISDataRecievedFromBackend] = useState(false);
    const options = {
        title: "Food Categories",
      };
    const fetchBackendDataForGraph =()=>{
        GetRequest("analytics/category?userId="+userId)
        .then(response=>{
              setData([
                ["Food items", "Quantity"],
                ["Fruits", response.fruits],
                ["Vegetables", response.vegetables],
                ["Canned Foods", response.cannedFoods],
                ["Juices", response.juices],
                ["Others", response.others],
              ])})
    }
    
    const [data,setData] = useState([]);

    useEffect(()=>{
        fetchBackendDataForGraph();
        setISDataRecievedFromBackend(true);
            },[])


  return (
    <div>
        {isDataRecievedFromBacken !== true || data.length === 0 ? (
                                  <div className="centralise-content">No food items to display.</div>
                                ) : (
                                    <Chart
                                    chartType="PieChart"
                                    data={data}
                                    options={options}
                                    width={"100%"}
                                    height={"300px"}
                                  />
                                )}
        
    </div>
  )
}

export default DashbaordPieChartAnalyticsCard