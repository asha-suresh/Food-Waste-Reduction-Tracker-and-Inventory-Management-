import React , { useEffect, useState } from 'react'
import './style.css'
import {FaPencilAlt, FaSave } from "react-icons/fa";
import GetRequest from '../Service/GetRequest';
import CollectionsCardView from '../components/Cartcontainer/CollectionsCardView';
import CreateNewCollectionPopup from '../components/PopupModals/CreateNewCollectionPopup';

const AddNewFooodPage = () => {


     //for creating new collection
     const [collectionName,setCollectionName ]=useState("")

     const[collectionsList,setcollectionsList]=useState([]);

     const [isCollectionCreationModalOpen, setIsCollectionCreationModalOpen] = useState(false);


    


  const handleOpenModal = () => {
    setIsCollectionCreationModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCollectionCreationModalOpen(false);
    console.log("collection created name is",collectionName);
  };
 
  
     useEffect(() => {
       const inventoryid= localStorage.getItem("inventoryid");
       GetRequest("all/collections?inventory_id="+inventoryid)
           .then(response=>{
               if(response){
                 setcollectionsList(response)
               }
           })
     }, []);
 
 

  return (
        <div className="outlet-container">

            <div className="graphical-area">
                <div className="add-food-form-container">
                <div className="modal-header-label-section">
                        <div className="modal-header-action-icon"><FaPencilAlt /></div>
                        <div className="modal-heading-label">Add Food Item</div>
                       <div className="modal-header-sub-label"></div>
                    </div>
                        <hr/>
                        <div className="dotted-border-contaner">
                            A food item can be added only inside a collection.
                            <br/>
                            You can either choose an existing collection or create new one.
                            <br/>
                            <br/>

                            <div className="modal-footer-primary-action"onClick={handleOpenModal}><FaSave/>
                                        Create New Collection
                                        </div>
                        </div>
                        <br/>
                        <CreateNewCollectionPopup isCollectionCreationModalOpen={isCollectionCreationModalOpen} onClose={handleCloseModal}/>

                    <div className="modal-content">
                        OR
                        <br/>
                        Choose a collection

                        <div className="cards-container">
                            {collectionsList.map((collection)=>
                            <CollectionsCardView key={collection.id} {...collection}/>
                            )}
                        </div>

                        <br/>

                        </div>
            
            </div>
            <div className="add-food-info-column"></div>
            </div>
            </div>

                    

)
}

export default AddNewFooodPage