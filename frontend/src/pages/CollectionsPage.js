import React , { useEffect, useState } from 'react'
import CollectionContainer from "../components/Cartcontainer/CollectionContainer";
import { FaPlus} from "react-icons/fa";
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
    setActivePath("cart");
    //eslint-disable-next-line
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
      <div className="cart-page-header-actions">
        <div className="card-page-add-new-cart" onClick={handleOpenModal}> <FaPlus/> New cart</div>
      </div>
      <CreateNewCollectionPopup isCollectionCreationModalOpen={isCollectionCreationModalOpen} onClose={handleCloseModal}/>


{collectionsList.map((collection)=><CollectionContainer key={collection.id} {...collection}/>)}




    </div>
  )
}

export default CollectionsPage