import React , { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import QRCode from 'react-qr-code';
import CollectionsQuickInfoTable from '../components/Tables/CollectionsQuickInfoTable';
import { useParams } from "react-router-dom";
import GetRequest from '../Service/GetRequest';

const CollectionHomePage = () => {

    const { collectionid } = useParams();
    const url = "http://localhost:3000/view/collection/"+collectionid;
    const [collectionName, setCollectionName] = useState("");
    const [ createdDate, setCreatedDate] = useState();
    const [updatedDate, setUpdatedDate] = useState();
    const [foodItems,setFoodItems ] = useState([]);

    const navigate = useNavigate();


    const fetchCollectionData= ()=>{
         GetRequest('view/collection?collection_id='+collectionid)
          .then(data => {
            setCollectionName(data.collectionName)
            setCreatedDate(data.createdDate)
            setUpdatedDate(data.updatedDate)
            setFoodItems(data.items)
        });
        }

     useEffect(()=>{
        fetchCollectionData();
     },[])   

        
  return (
    <div className='collection-home-container'>
        <div className="modal-content">
                        
                    
                    <div className="collection-edit-quick-info">
                        <div className="collection-edit-column1">
                            <div className="collection-name">
                                    <div className="collection-name-label">Collection Name :</div>
                                    <div class="invisible-input">{collectionName}</div>
                            </div>
                            <div className="collection-name-label faded-text">Created on {createdDate}</div>
                            <div className="collection-name-label faded-text">Last updated on {updatedDate}</div>

                        </div>
                        <div className="collection-edit-column2">
                            <div className="qr-code-area">
                                    <QRCode value = {url}
                                            style={{ height: "auto", maxWidth: "95%", width: "95%" }}
                                    />
                            </div>
                        </div>
                    </div>
                    <br/>

                    <CollectionsQuickInfoTable items={foodItems}/>
    </div>
    <div className="sidebar-add-food-btn" onClick={() => { navigate("/login");}}>Go back to login page</div> 
    <br/>  
</div>
  )
}

export default CollectionHomePage