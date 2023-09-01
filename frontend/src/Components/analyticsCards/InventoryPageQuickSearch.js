import React, { useEffect, useState } from 'react'
import GetRequest from '../../Service/GetRequest'
import { QuickSearchFilterResultCard } from './QuickSearchFilterResultCard';

const InventoryPageQuickSearch = () => {

    const userId = localStorage.getItem("userid");

    const [foodName, setFoodName] = useState();
    const [foodItemsNameSuggestionList, setFoodItemsNameSuggestionList] = useState([]);

    const fetchFoodItemsFilteredList =()=>{
        GetRequest('view/all/foods?userId='+userId+'&searchFilter='+foodName)
        .then(response=>{
            setFoodItemsNameSuggestionList(response)})
            }


   

    const handleInputChange = (event) => {
        const input = event.target.value.toLowerCase();
        fetchFoodItemsFilteredList();
        setFoodName(input);
    };

   

  return (

    <div className="dashboard-info-row-with-search-box">
      <br/><br/>
          <br/> <input
                          type="text"
                          name="Food Item Name"
                          placeholder="Enter a Food item name to search"
                          className="custom-input search-box-custom-width"
                          value={foodName} onChange={handleInputChange} required>
                          </input>


                          
                        {foodItemsNameSuggestionList.length > 0 && (
                                                          <div className="suggestions-list-big">

                              <div className="table-container">
                              <div className="table-header">
                                  <div className="table-column-title">Food</div>
                                  <div className="table-column-title">Quantity</div>
                                  <div className="table-column-title">Status</div>
                                  <div className="consume-primary-btn" onClick={()=>{setFoodItemsNameSuggestionList([])}}>Close</div>

                  
                              </div>
                              <div className="table-body-content">
                  
                              {foodItemsNameSuggestionList === null || foodItemsNameSuggestionList.length === 0 ? (
                                            <div className="centralise-content">No Donation items to display.</div>
                                          ) : (
                                  foodItemsNameSuggestionList.map((suggestion, index) => (
                                            <QuickSearchFilterResultCard key={suggestion.id} {...suggestion}/>
                                  )))
                             }
                              </div></div></div>)}

          </div>
  )
}

export default InventoryPageQuickSearch