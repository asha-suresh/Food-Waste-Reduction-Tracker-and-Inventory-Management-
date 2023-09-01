import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import GetRequest from '../../Service/GetRequest';
import AddNewFoodSuggestionPopup from '../PopupModals/AddNewFoodSuggestionPopup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const FoodSuggestionTableRow = ({id,slno,foodName,category,expiryDay,protein,calorie}) => {

    const [isAddNewFoodSuggestionModalOpen, setIsAddNewFoodSuggestionModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsAddNewFoodSuggestionModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsAddNewFoodSuggestionModalOpen(false);
    };
    
const removeFoodItemSuggestion = ()=>{
    GetRequest('delete/food/suggestions?foodInfoId='+id)
    .then(data => {
     console.log(data)});
     toast.success("Food item has been removed!", {
       position: toast.POSITION.TOP_RIGHT
     });
}


  return (
    <div className="food-info-table-row">
                    <div className="table-row-data-slno">{slno}</div>
                    <div className="table-row-data-block">{foodName}</div>
                    <div className="table-row-data-block">{category}</div>
                    <div className="table-row-data-block">{expiryDay}</div>
                    <div className="table-row-data-block">
                        <div className="donating-food-item-name">Protien : {protein}</div>
                        <div className="donating-food-item-category">Calorie : {calorie}</div>
                      </div>
                      <div className='row-action'>
                            <div className="inventory-action-btns edit-key" onClick={handleOpenModal}><FaEdit/></div>
                            <div className="inventory-action-btns del-key" onClick={removeFoodItemSuggestion}><FaTrash/></div>
                    </div>

                    <AddNewFoodSuggestionPopup isAddNewFoodSuggestionModalOpen={isAddNewFoodSuggestionModalOpen} onAddFoodSuggestionPopupClose={handleCloseModal} id={id} foodName ={foodName} category ={category} expiryDay ={expiryDay} protein={protein} calorie={calorie} action={"edit"}/>

    </div>  
  )
}

export default FoodSuggestionTableRow