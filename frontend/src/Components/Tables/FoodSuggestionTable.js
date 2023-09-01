import React, { useEffect, useState } from 'react'
import FoodSuggestionTableRow from './FoodSuggestionTableRow'
import GetRequest from '../../Service/GetRequest';

const FoodSuggestionTable = () => {

    const [foodSuggestionsList, setFoodSuggestionsList] = useState([]);

    useEffect(()=>{
        fetchFoodSuggestionItems();
      },[])
    
    
    const fetchFoodSuggestionItems= ()=>{
       GetRequest('get/all/food/suggestions')
        .then(data => {
            setFoodSuggestionsList(data)});
      }

  return (
    <div className="table-container">
              <div className="donations-table-header">
                  <div className="table-column-title-slno">#</div>
                  <div className="donations-table-column-title">Food Name</div>
                  <div className="donations-table-column-title">Category</div>
                  <div className="donations-table-column-title">Expiry Days</div>
                  <div className="donations-table-column-title">Details</div>
                  <div className="donations-table-column-title">Actions</div>
              </div>
              <div className="table-body-content">

              {foodSuggestionsList === null || foodSuggestionsList.length === 0 ? (
                          <div className="centralise-content">No Donation items to display.</div>
                        ) : (
                            foodSuggestionsList.map((item, index) => (
                            <FoodSuggestionTableRow key={item.id} slno={index + 1} {...item} />
                          ))
                        )}
      
              </div>
          </div>
  )
}

export default FoodSuggestionTable