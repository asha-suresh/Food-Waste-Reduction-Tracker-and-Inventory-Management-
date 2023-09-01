import React from 'react'

const EditProfilePopup = () => {

    

  return (
    <div className="modal-container">
        <div className="modal-area">
                <div className="modal-header">
                    <div className="modal-header-label-section">
                        <div className="modal-header-action-icon"><FaPencilAlt/></div>
                        <div className="modal-heading-label">Add or Edit New Food Details</div>
                    </div>
                </div>
                 <hr/>
                      
                <div className="modal-content">
                                <button className="modal-close" onClick={onAddFoodSuggestionPopupClose}>
                                &times;
                                </button>
                    <div className="add-food-form">
  
          
                    <br/>
                    Name <input
                            type="text"
                            name="Category"
                            placeholder="Enter Food name"
                            className="custom-input"
                            value={foodItemName} onChange={(e)=>{setFoodItemName(e.target.value)}} required
                    ></input>  <br/>
                    Category <input
                            type="text"
                            name="Category"
                            placeholder="Enter Category"
                            className="custom-input"
                            value={foodCategory} onChange={(e)=>{setFoodCategory(e.target.value)}} required
                    ></input>   <br/>
                    Expiry in days <input
                            type="text"
                            name="Category"
                            placeholder="Enter no of days"
                            className="custom-input"
                            value={foodExpiryInDays} onChange={(e)=>{setFoodExpiryInDays(e.target.value)}} required
                    ></input>   <br/>
                    Protein <input
                            type="text"
                            name="Category"
                            placeholder="Enter protien details"
                            className="custom-input"
                            value={foodProtien} onChange={(e)=>{setFoodProtien(e.target.value)}} required
                    ></input>  <br/>  
  
                    Calorie <input
                            type="text"
                            name="Category"
                            placeholder="Enter calorie"
                            className="custom-input"
                            value={foodCalorie} onChange={(e)=>{setFoodCalorie(e.target.value)}} required
                    ></input> 
                                     <br/>
  
                                     
                    </div>
  
                     <br/>
  

  
                </div>
                <div className="modal-footer-with-delete-option">
                    <div className="modal-footer-primary-actions-style">
                        <div className="modal-footer-primary-action" onClick={addOrEditFoodItemSuggestion}><FaSave/>Add</div>
                        <div className="modal-footer-close-btn" onClick={onAddFoodSuggestionPopupClose}> &times; Cancel</div>
                    </div>
                        
                </div>
        </div>
        <ToastContainer closeButton={false}/>
  
      </div>
  )
}

export default EditProfilePopup