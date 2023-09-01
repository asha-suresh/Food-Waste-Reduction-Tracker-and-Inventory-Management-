import React , { useState,useEffect } from 'react'
import './style.css'
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import CollectionsQuickInfoTable from '../Tables/CollectionsQuickInfoTable';
import QRCode from 'react-qr-code';
import GetRequest from '../../Service/GetRequest';



const ViewCollectionDetailsPopup = ({ isOpen, onClose, collectionid, collectionName, createdDate, updatedDate, items}) => {
    const navigate = useNavigate();
    const urlForQRCode = "http://localhost:3000/view/collection/"+collectionid;


    const deleteCollection = () => {
         const inventoryid= localStorage.getItem("inventoryid");
          GetRequest("remove/collection?inventory_id="+inventoryid+"&collection_id="+collectionid)
              .then(response=>{
                    onClose();
                    navigate("/cart");
              })
      };

    
    
    
    if (!isOpen) return null;

    return (
      <div className="modal-container">
        <div className="modal-area modal-area-edit-collection">
                <div className="modal-header">
                    <div className="modal-header-label-section">
                        <div className="modal-header-action-icon"><FaEye /></div>
                        <div className="modal-heading-label">View Collection</div>
                        <div className="modal-header-sub-label">#{collectionid}</div>
                    </div>
                </div>
                <hr/>
                <div className="modal-content">
                                <button className="modal-close" onClick={onClose}>
                                &times;
                                </button>
                    
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
                                    <QRCode value ={urlForQRCode} 
                                            style={{ height: "auto", maxWidth: "95%", width: "95%" }}
                                    />
                            </div>
                            <div className="qr-code-action-btn faded-text">Print QR code for easy access</div>
                        </div>
                    </div>

<br/>
                    <CollectionsQuickInfoTable items={items}/>

                </div>
                <div className="modal-footer-with-delete-option">
                    <div className="modal-footer-close-btn" onClick={deleteCollection}> Delete Collection</div>
                    <div className="modal-footer-primary-actions-style">
                        <div className="modal-footer-close-btn" onClick={onClose}> &times; Close</div>
                    </div>
                        
                </div>
        </div>
      </div>
    );
  };

export default ViewCollectionDetailsPopup