import React , { useEffect, useState } from 'react'
import './style.css'
import {FaLightbulb, FaPencilAlt, FaSave } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PostRequest from '../../Service/PostRequest';
import GetRequest from '../../Service/GetRequest';
import { parse } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const AddFoodPopup = ({ isAddNewFoodModalOpen, onAddFoodPopupClose, collectionId}) => {

    const userID = localStorage.getItem("userid");

    const [showSuggestion , setShowSuggestion] = useState(false);
    const [ expiryDayCount, setExpriyDayCount] = useState();


    const [foodName, setFoodName] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState();
    const [expiryDate, setExpiryDate] = useState();

  const handleDateChange = (date) => {
    setExpiryDate(date);
  };

  const getFoodExpiryDateSuggestion =() =>{
    GetRequest("get/expiry/suggestion?foodName="+foodName)
        .then(response=>{
            if(response){
              console.log(response)
              setCategory(response.category)
              const parsedExpiryDate = parse(response.expiryDate, 'dd-MM-yyyy', new Date());
              setExpiryDate(parsedExpiryDate)
              setExpriyDayCount(response.expiryDaysCount)
              setShowSuggestion(true)
            }
        })
  }

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    // Call the getFoodExpiryDateSuggestion function after setting the quantity
    getFoodExpiryDateSuggestion();
  };

  useEffect(()=>{},[setCategory,setExpiryDate]);


  const handleAddFoodPostRequest=()=>{
    PostRequest('http://localhost:8080/api/add/new/food?collection_id='+collectionId +'&userId='+userID, { productName: foodName,category:category,quantity:quantity,expiryDate:expiryDate })
  .then(data => {
    console.log("food item added successfully");
    onAddFoodPopupClose();
    toast.success("Food item Added successfully!", {
      position: toast.POSITION.TOP_RIGHT
    });
  });
}
  
  if (!isAddNewFoodModalOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-area">
              <div className="modal-header">
                  <div className="modal-header-label-section">
                      <div className="modal-header-action-icon"><FaPencilAlt /></div>
                      <div className="modal-heading-label">Add New Food</div>
                      <div className="modal-header-sub-label">#{collectionId}</div>
                  </div>
              </div>
               <hr/>
                    
              <div className="modal-content">
                              <button className="modal-close" onClick={onAddFoodPopupClose}>
                              &times;
                              </button>
                  <div className="add-food-form">

        
                  Food item Name <input
                          type="text"
                          name="Food Item Name"
                          placeholder="Enter Food item name"
                          className="custom-input"
                          value={foodName} onChange={(e)=>{setFoodName(e.target.value)}} required>
                          </input>
                          <br/>
                  Quantity <input
                          type="text"
                          name="Quantity"
                          placeholder="Enter Quantity"
                          className="custom-input"
                          value={quantity} onChange={handleQuantityChange} required
                  ></input>                  <br/>

                  Category <input
                          type="text"
                          name="Category"
                          placeholder="Enter Category"
                          className="custom-input"
                          value={category} onChange={(e)=>{setCategory(e.target.value)}} required
                  ></input>                  <br/>

                                    Expiry Date <DatePicker
                                        selected={expiryDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Select a date"
                                      />                      
                  </div>

<br/>


{showSuggestion === true ? (
          <div className="expired-status-banner">
                <FaLightbulb/>Suggestion: {foodName} will expire in {expiryDayCount} days.
          </div>):null }

              </div>
              <div className="modal-footer-with-delete-option">
                  <div className="modal-footer-primary-actions-style">
                      <div className="modal-footer-primary-action" onClick={handleAddFoodPostRequest}><FaSave/>Add</div>
                      <div className="modal-footer-close-btn" onClick={onAddFoodPopupClose}> &times; Cancel</div>
                  </div>
                      
              </div>
      </div>
      <ToastContainer closeButton={false}/>

    </div>
  );
};

export default AddFoodPopup
