import React , { useState , useEffect} from 'react'
import './style.css'
import { FaCheckCircle, FaCookieBite, FaDonate, FaEye, FaPencilAlt, FaRegClock, FaShare, FaSuse, FaTrash, FaUtensilSpoon } from "react-icons/fa";
import EditFoodItemPopup from '../PopupModals/EditFoodItemPopup';
import GetRequest from '../../Service/GetRequest';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Carts = ({id,foodName,expiryDate,quantity,status}) => {

    const [isFoodItemEditPopupOpened, setIsFoodItemEditPopupOpened] = useState(false);
    const userID = localStorage.getItem("userid");

  const handleOpenEditFoodItemModal = () => {
    setIsFoodItemEditPopupOpened(true);
  };

  const handleOpenEditFoodItemCloseModal = () => {
    setIsFoodItemEditPopupOpened(false);
  };

  const consumeFood=()=>{
    GetRequest('consume/food?foodId='+id)
     .then(data => {
         console.log(data)});
         toast.success("Food item has been consumed!", {
           position: toast.POSITION.TOP_RIGHT
         });
   }

   const removeFood=()=>{
    GetRequest('remove/food/item?foodItemId='+id)
     .then(data => {
      console.log(data)});
      toast.success("Food item has been removed!", {
        position: toast.POSITION.TOP_RIGHT
      });
   }

  const handleDonateFood = () => {
      GetRequest("donate/food?food_id="+id+"&user_id="+userID)
          .then(data=>{
            console.log(data)});
            toast.info("Food item Donated. Thankyou!", {
              position: toast.POSITION.TOP_RIGHT
            });
          }


  return (
        
<div className={`cart ${status === "expired" ? "card-inactive" : ""}`}>
    <div className="cart-header">
    {status !== 'expired' && status !== 'donated' && status !== 'consumed' ? (<div class="button-container">
            <div class="view-button">
              <FaEye/>
            <div className="button-options">
              <button className="edit-button" onClick={handleOpenEditFoodItemModal}> <FaPencilAlt/>Edit</button>
              <button className="edit-button" onClick={consumeFood}> <FaCookieBite/>Consume</button>
              <button className="edit-button" onClick={handleDonateFood}> <FaDonate/>Donate</button>
              <button className="delete-button" onClick={removeFood}><FaTrash/> Remove</button>
            </div>                </div>
            </div>

        ):null }

          

</div>
<EditFoodItemPopup isEditFoodItemPopupOpen={isFoodItemEditPopupOpened} onEditFoodItemPopupClose={handleOpenEditFoodItemCloseModal} />

    <div className="cart-content">
        <div className="food-item-name">{foodName}</div>
        <div className="purchased-quantity">{quantity} quanity</div>
    </div>
      {status === 'warning' ? (
          <div className="status-banner">
            <FaRegClock/>Expiring soon
          </div>
        ) :null }
      {status === 'expired' ? (
          <div className="expired-status-banner">
            <FaRegClock/>Expired
          </div>):null }
      {status === 'safe' ? (
      <div className="safe-status-banner">
        <FaCheckCircle/>Safe
      </div>):null }
      {status === 'donated' ? (
      <div className="donations-status-banner">
        <FaDonate/>Donated
      </div>):null }
      {status === 'consumed' ? (
      <div className="consumed-status-banner">
        <FaUtensilSpoon/>Consumed
      </div>):null }
    <div className="cart-footer">Expire on {expiryDate}</div>
    <ToastContainer closeButton={false}/>
</div>  )
}

export default Carts