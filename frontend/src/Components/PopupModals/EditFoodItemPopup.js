import React from 'react'
import './style.css'
import { FaPencilAlt, FaSave } from "react-icons/fa";

const EditFoodItemPopup = ({ isEditFoodItemPopupOpen, onEditFoodItemPopupClose }) => {
    if (!isEditFoodItemPopupOpen) return null;

    return (
      <div className="modal-container">
        <div className="modal-area">
                <div className="modal-header">
                    <div className="modal-header-label-section">
                        <div className="modal-header-action-icon"><FaPencilAlt /></div>
                        <div className="modal-heading-label">Edit Food item</div>
                        <div className="modal-header-sub-label">#37896</div>
                    </div>
                </div>
                <hr/>
                <div className="modal-content">
                    <div className="collection-edit-quick-info">
                        <div className="collection-edit-column2">
                        <div className="collection-name">
                                    <div className="collection-name-label">Name :</div>
                                    <input
                                        type="text"
                                        name="Food Item Name"
                                        placeholder="Enter Food item name"
                                        className="custom-input"
                                        >
                                    </input>
                        </div>
                        <div className="collection-name">
                                    <div className="collection-name-label">Category :</div>
                                    <input
                                        type="text"
                                        name="Food Item Name"
                                        placeholder="Enter Food item name"
                                        className="custom-input"
                                        >
                                    </input>
                        </div>
                        <div className="collection-name">
                                    <div className="collection-name-label">Quantity :</div>
                                    <input
                                        type="text"
                                        name="Food Item Name"
                                        placeholder="Enter Food item name"
                                        className="custom-input"
                                        >
                                    </input>
                        </div>
                        <div className="collection-name">
                                    <div className="collection-name-label">Expiry Date :</div>
                                    <input
                                        type="text"
                                        name="Food Item Name"
                                        placeholder="Enter Food item name"
                                        className="custom-input"
                                        >
                                    </input>
                        </div>
                           
                            <div className="collection-name-label faded-text">Last updated on 26/9/1998</div>

                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="modal-footer-primary-action"><FaSave/>Save</div>
                    <div className="modal-footer-close-btn" onClick={onEditFoodItemPopupClose}> &times; Cancel</div>
                </div>
        </div>
      </div>
    );
}

export default EditFoodItemPopup