import React, { useEffect, useState } from 'react'
import './style.css'
import { FaPencilAlt, FaSave } from "react-icons/fa";
import GetRequest from '../../Service/GetRequest';
import DatePicker from 'react-datepicker';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PostRequest from '../../Service/PostRequest';

const EditFoodItemPopup = ({ isEditFoodItemPopupOpen, onEditFoodItemPopupClose, id,foodName,quantity,category }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [foodItemsNameSuggestionList, setFoodItemsNameSuggestionList] = useState([]);

  const handleInputChange = (event) => {
    const input = event.target.value.toLowerCase();
    const filteredItems = foodItemsNameSuggestionList.filter(item => item.toLowerCase().includes(input));
    setSuggestions(filteredItems);
    setFoodName(input);
  };

  const handleSuggestionClick = (suggestion) => {
    setFoodName(suggestion);
    setSuggestions([]);
  };



    const [foodItemName, setFoodName] = useState(foodName);
    const [updatedQuantity, setupdatedQuantity] = useState(quantity);
    const [updatedCategory, setupdatedCategory] = useState(category);


  
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setupdatedQuantity(newQuantity);
  };

  const fetchAllFoodItemsNameForSuggestion =()=>{
    GetRequest("get/food/name/suggestion")
        .then(response=>{
          setFoodItemsNameSuggestionList(response);
        })
  }

  useEffect(()=>{
    fetchAllFoodItemsNameForSuggestion();
  },[setupdatedCategory]);


  const handleEditFoodPostRequest=()=>{
    PostRequest('http://localhost:8080/api/edit/food?foodId='+id , { productName: foodItemName,category:updatedCategory,quantity:updatedQuantity})
  .then(data => {
    toast.success("Food item Added successfully!", {
      position: toast.POSITION.TOP_RIGHT
    });
  });
  onEditFoodItemPopupClose();
}
  
if (!isEditFoodItemPopupOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-area">
              <div className="modal-header">
                  <div className="modal-header-label-section">
                      <div className="modal-header-action-icon"><FaPencilAlt /></div>
                      <div className="modal-heading-label">Edit Food</div>
                  </div>
              </div>
               <hr/>
                    
              <div className="modal-content">
                              <button className="modal-close" onClick={onEditFoodItemPopupClose}>
                              &times;
                              </button>
                  <div className="add-food-form">

        
                  Food item Name <input
                          type="text"
                          name="Food Item Name"
                          placeholder="Enter Food item name"
                          className="custom-input"
                          value={foodItemName} onChange={handleInputChange} required>
                          </input>
                        {suggestions.length > 0 && (
                                <ul className="suggestions-list">
                                  {suggestions.map((suggestion, index) => (
                                    <li
                                      key={index}
                                      onClick={() => handleSuggestionClick(suggestion)}
                                      className="suggestion"
                                    >
                                      {suggestion}
                                    </li>
                                  ))}
                                </ul>
                              )}

                          <br/>
                  Quantity <input
                          type="text"
                          name="Quantity"
                          placeholder="Enter Quantity"
                          className="custom-input"
                          value={updatedQuantity} onChange={handleQuantityChange} required
                  ></input>                  <br/>

                  Category <input
                          type="text"
                          name="Category"
                          placeholder="Enter Category"
                          className="custom-input"
                          value={updatedCategory} onChange={(e)=>{setupdatedCategory(e.target.value)}} required
                  ></input>                  <br/>
                  
                  </div>

<br/>

              </div>
              <div className="modal-footer-with-delete-option">
                  <div className="modal-footer-primary-actions-style">
                      <div className="modal-footer-primary-action" onClick={handleEditFoodPostRequest}><FaSave/>Update</div>
                      <div className="modal-footer-close-btn" onClick={onEditFoodItemPopupClose}> &times; Cancel</div>
                  </div>
                      
              </div>
      </div>
      <ToastContainer closeButton={false}/>

    </div>
  );
}

export default EditFoodItemPopup