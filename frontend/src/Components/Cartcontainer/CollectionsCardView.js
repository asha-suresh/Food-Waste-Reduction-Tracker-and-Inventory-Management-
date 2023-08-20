import React , { useEffect, useState } from 'react'
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
    <div className="cart" >
    <div className="cart-header">

</div>

    <div className="cart-content">
        <div className="food-item-name" onClick={handleAddFoodPopupModalOpen}>{collectionName}</div>
        <div className="purchased-quantity">{items.size}</div>
    </div>
    <AddFoodPopup isAddNewFoodModalOpen={isAddNewFoodModalOpen} onAddFoodPopupClose={handleAddFoodsPopupCloseModal} collectionId={id}/>

    <div className="cart-footer">Expire on {createdDate}</div>
</div> 
  )
}

export default CollectionsCardView