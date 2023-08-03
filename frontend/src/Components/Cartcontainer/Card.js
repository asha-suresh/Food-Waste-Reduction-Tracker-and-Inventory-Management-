import React , { useState } from 'react'
import './style.css'
import { FaClock, FaEye, FaPencilAlt, FaRegClock, FaTimes, FaTimesCircle, FaTrash } from "react-icons/fa";
import EditFoodItemPopup from '../PopupModals/EditFoodItemPopup';

const Carts = ({id,foodName,expiryDate,quantity}) => {
    const [isFoodItemEditPopupOpened, setIsFoodItemEditPopupOpened] = useState(false);

  const handleOpenEditFoodItemModal = () => {
    setIsFoodItemEditPopupOpened(true);
  };

  const handleOpenEditFoodItemCloseModal = () => {
    setIsFoodItemEditPopupOpened(false);
  };
  return (
        
<div className="cart">
    <div className="cart-header">
    <div class="button-container">
        <div class="view-button">
        <FaEye/>
    <div className="button-options">
      <button className="edit-button" onClick={handleOpenEditFoodItemModal}> <FaPencilAlt/>Edit</button>
      <button className="delete-button"><FaTrash/> Remove</button>
    </div>
  </div>
</div>

</div>
<EditFoodItemPopup isEditFoodItemPopupOpen={isFoodItemEditPopupOpened} onEditFoodItemPopupClose={handleOpenEditFoodItemCloseModal} />

    <div className="cart-content">
        <div className="food-item-name">{foodName}</div>
        <div className="purchased-quantity">{quantity} quanity</div>
    </div>
    <div className="status-banner">
        <FaRegClock/>Expiring soon
    </div>
    <div className="cart-footer">Expire on {expiryDate}</div>
</div>  )
}

export default Carts