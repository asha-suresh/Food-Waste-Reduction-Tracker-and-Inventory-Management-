import React , { useEffect, useState } from 'react'
import './style.css'
import {FaPencilAlt, FaPlusCircle } from "react-icons/fa";
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
                <br/>
                <div className="modal-header-label-section">
                        <div className="modal-header-action-icon"><FaPencilAlt /> Add Food Item</div>
                    </div>
                        <br/>
                        <div className="dotted-border-contaner">
                        <div className="centralise-text">A food item can be added only inside a collection.</div>
                            <br/>
                            <br/>

                            <div className="sidebar-add-food-btn"onClick={handleOpenModal}><FaPlusCircle/> 
                                        Create New Collection
                                        </div>
                        </div>
                        <CreateNewCollectionPopup isCollectionCreationModalOpen={isCollectionCreationModalOpen} onClose={handleCloseModal}/>

                    <div className="modal-content">
                    <div className="centralise-text">OR</div>
                        <br/>
                        <div className="centralise-text">Choose a collection
                        </div>
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