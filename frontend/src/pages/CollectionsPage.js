import React , { useEffect, useState } from 'react'
import CollectionContainer from "../components/Cartcontainer/CollectionContainer";
import { FaPlus, FaPlusCircle} from "react-icons/fa";
import './style.css'
import GetRequest from '../Service/GetRequest'
import CreateNewCollectionPopup from '../components/PopupModals/CreateNewCollectionPopup';


const CollectionsPage = ( {setActivePath} ) => {


  const [isCollectionCreationModalOpen, setIsCollectionCreationModalOpen] = useState(false);
  const[collectionsList,setcollectionsList]=useState([]);

  const handleOpenModal = () => {
    setIsCollectionCreationModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCollectionCreationModalOpen(false);
  };


  useEffect(() => {
    setActivePath("Collections");
    //eslint-disable-next-line
    FetchAllCollections();
  }, [isCollectionCreationModalOpen]);

  const FetchAllCollections = async()=>{
    const inventoryid= localStorage.getItem("inventoryid");
    await GetRequest("all/collections?inventory_id="+inventoryid)
    .then(response=>{
        if(response){
          setcollectionsList(response)
        }
    })
  }

  const handleCardUpdate = () => {
    // Perform data update logic here
    FetchAllCollections();
  };

  return (
    <div className="outlet-container">
      <div className="cart-page-header-actions">
            {collectionsList.length !== 0 ?
            (<div className="card-page-add-new-cart" onClick={handleOpenModal}> <FaPlus/> New collection</div>):null}
      </div>
      <CreateNewCollectionPopup isCollectionCreationModalOpen={isCollectionCreationModalOpen} onClose={handleCloseModal}/>


{}


{collectionsList === null || collectionsList.length === 0 ? (
                          <div className="centralise-content">
                                <div className="dotted-border-contaner">
                                      <div className="centralise-text">A food item can be added only inside a collection.</div>
                                          <br/>
                                          <br/>
                                          <div className="card-page-add-new-cart"onClick={handleOpenModal}><FaPlusCircle/> 
                                                      Create New Collection
                                                      </div>
                                      </div></div>
                        ) : (
                            collectionsList.map((collection)=><CollectionContainer key={collection.id} {...collection}  onUpdate={handleCardUpdate}/>)
                        )}

    </div>
  )
}

export default CollectionsPage