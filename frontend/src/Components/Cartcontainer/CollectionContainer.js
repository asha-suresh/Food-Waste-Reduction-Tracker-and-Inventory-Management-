import './style.css'
import React, {useState } from "react";
import Carts from './Card'
import {FaEye, FaPencilAlt } from "react-icons/fa";
import ViewCollectionDetailsPopup from '../PopupModals/ViewCollectionDetailsPopup';
import AddFoodPopup from '../PopupModals/AddFoodPopup';


const CollectionContainer = ({id, createdDate, items, collectionName, updatedDate,onUpdate}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAddNewFoodModalOpen, setIsAddNewFoodModalOpen] = useState(false);

     const handleAddFoodPopupModalOpen = () => {
       setIsAddNewFoodModalOpen(true);

     };
 
     const handleAddFoodsPopupCloseModal = () => {
       setIsAddNewFoodModalOpen(false);
     };


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  // if (items.length === 0) {
  //   return <p>No Food Collections to display.</p>;
  // }
  return (
        <div className="cart-container">

        <div className="cart-container-header">
            <div className="purchased-date"> <span style={{ fontWeight: 'bold', fontSize:'20px', marginRight:'20px'}}>{collectionName}</span>    created on {createdDate}</div>
            <div className="cart-container-right-column">
                <div className="add-item-to-cart-btn" onClick={handleAddFoodPopupModalOpen}>Add item</div>
                <div className="cart-edit-btn" onClick={handleOpenModal}><FaEye />  View</div>
            </div>
            <AddFoodPopup isAddNewFoodModalOpen={isAddNewFoodModalOpen} onAddFoodPopupClose={handleAddFoodsPopupCloseModal} collectionId={id}/>
            <ViewCollectionDetailsPopup isOpen={isModalOpen} onClose={handleCloseModal} collectionName={collectionName} collectionid={id} createdDate={createdDate} updatedDate={updatedDate} items={items} />

        </div>
        <div className="cards-container">

            {items === null || items.length === 0 ? (
                                  <div className="centralise-content">No food items to display.</div>
                                ) : (
                                  items.map((item) => (<Carts key={item.id} {...item}  onUpdate={onUpdate}/>))
                                )}
            
        </div>
        <br/>
    </div>

  )
}

export default CollectionContainer