import './style.css'
import React, { useEffect, useState } from "react";
import Carts from './Card'
import {FaPencilAlt } from "react-icons/fa";
import EditCartPopup from '../PopupModals/EditCartPopup';
import GetRequest from '../../Service/GetRequest';
import AddFoodPopup from '../PopupModals/AddFoodPopup';


const CollectionContainer = ({id, createdDate, items, collectionName, updatedDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[collection,setcollection]=useState([]);

  const [isAddNewFoodModalOpen, setIsAddNewFoodModalOpen] = useState(false);

     const handleAddFoodPopupModalOpen = () => {
       setIsAddNewFoodModalOpen(true);

     };
 
     const handleAddFoodsPopupCloseModal = () => {
       setIsAddNewFoodModalOpen(false);
     };


  const handleOpenModal = () => {
    setIsModalOpen(true);
      GetRequest("view/collection?collection_id="+id)
          .then(response=>{
              if(response){
                setcollection(response)
              }
          })
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
                <div className="cart-edit-btn" onClick={handleOpenModal}><FaPencilAlt />  Edit</div>
            </div>
            <AddFoodPopup isAddNewFoodModalOpen={isAddNewFoodModalOpen} onAddFoodPopupClose={handleAddFoodsPopupCloseModal} collectionId={id}/>
            <EditCartPopup isOpen={isModalOpen} onClose={handleCloseModal} collectionName={collectionName} collectionid={id} createdDate={createdDate} updatedDate={updatedDate} items={items} />

        </div>
        <div className="cards-container">
            
        {items.map((item) => (
                                       <Carts key={item.id} {...item}/>
                   ))}

                   
        </div>
        <br/>
    </div>

  )
}

export default CollectionContainer