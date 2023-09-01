import React, { useEffect, useState } from 'react'
import FoodSuggestionTable from '../components/Tables/FoodSuggestionTable';
import { FaPlus } from 'react-icons/fa';
import AddNewFoodSuggestionPopup from '../components/PopupModals/AddNewFoodSuggestionPopup';

const AdminDashboard = ({setActivePath}) => {
  const [isAddNewFoodSuggestionModalOpen, setIsAddNewFoodSuggestionModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsAddNewFoodSuggestionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddNewFoodSuggestionModalOpen(false);
  };


  useEffect(() => {
    setActivePath("Admin");
  }, []);
  


  return (
    <div className="outlet-container">
      <div className="cart-page-header-actions">
            <div className="card-page-add-new-cart" onClick={handleOpenModal}> <FaPlus/> Add new food suggestion</div>
      </div><br/>
      <AddNewFoodSuggestionPopup isAddNewFoodSuggestionModalOpen={isAddNewFoodSuggestionModalOpen} onAddFoodSuggestionPopupClose={handleCloseModal} id={""} foodName ={""} category ={""} expiryDay ={""} protein={""} calorie={""} action={"new"}/>

      <FoodSuggestionTable/>
    </div>
  )
}

export default AdminDashboard