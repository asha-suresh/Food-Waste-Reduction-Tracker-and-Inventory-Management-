import React , {useState } from 'react'
import AddFoodPopup from '../PopupModals/AddFoodPopup';

const CollectionsCardView = ({id, createdDate, items, collectionName, updatedDate}) => {
  const [isAddNewFoodModalOpen, setIsAddNewFoodModalOpen] = useState(false);

     const handleAddFoodPopupModalOpen = () => {
       setIsAddNewFoodModalOpen(true);
     };
 
     const handleAddFoodsPopupCloseModal = () => {
       setIsAddNewFoodModalOpen(false);
       onClose();
     };

  return (
    <div className="collections-card-view" >
      <br/>
    <div className="cart-content" onClick={handleAddFoodPopupModalOpen}>
        <div className="food-item-name">{collectionName}</div>
    </div>
    <AddFoodPopup isAddNewFoodModalOpen={isAddNewFoodModalOpen} onAddFoodPopupClose={handleAddFoodsPopupCloseModal} collectionId={id}/>

    <div className="cart-footer">Created on {createdDate}</div>
</div> 
  )
}

export default CollectionsCardView