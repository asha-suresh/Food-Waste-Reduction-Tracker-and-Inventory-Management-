import React, { useEffect, useState } from 'react'
import PostRequest from '../../Service/PostRequest';
import { FaPencilAlt, FaSave } from 'react-icons/fa';
import GetRequest from '../../Service/GetRequest';

const FetchUserDetailsPopupForDonation = ({isUserDetailsPopupOpen,onUserDetailsPopupClose, foodItemId}) => {
    

    const userID = localStorage.getItem("userid");
    const [phoneNumber, setPhoneNumber]=useState("");
    const [houseNo, setHouseName]=useState("");
    const [streetOrCityName, setStreetOrCityName]=useState("");
    const [pinCode, setPinCode]=useState("");
    const [updateRequired, setUpdateRequired] = useState(false);

    //for getting default user contact and address for communication
    useEffect(()=>{
        if(isUserDetailsPopupOpen){
        GetRequest("view/user/details?userId="+userID)
            .then(data=>{
                setPhoneNumber(data.phoneNo);
                setHouseName(data.houseNo);
                setStreetOrCityName(data.streetOrCityName);
                setPinCode(data.pinCode);
            });  }       
    },[isUserDetailsPopupOpen]);

    const handleDonateFood = () => {
        PostRequest('http://localhost:8080/api/donate/food?food_id='+foodItemId, { userId: userID, phoneNo:phoneNumber, houseNo:houseNo, streetOrCityName:streetOrCityName ,pinCode:pinCode, updateRequired:updateRequired })
            .then(data=>{
              console.log(data);});
              onUserDetailsPopupClose(true)
            }
  
  
    if (!isUserDetailsPopupOpen) return null;

    return (
      <div className="modal-container">
        <div className="modal-area">
                <div className="modal-header">
                    <div className="modal-header-label-section">
                        <div className="modal-header-action-icon"><FaPencilAlt /></div>
                        <div className="modal-heading-label">Choose contact details for donation</div>
                    </div>
                </div>
                <hr/>

    

                <div className="modal-content">
                    <div className="collection-edit-quick-info">
                        <div className="collection-edit-column2">
                        <div className="collection-name">
                                    <div className="collection-name-label">House Name/ No :</div>
                                    <input
                                        type="text"
                                        placeholder="Enter Housename/no"
                                        className="custom-input"
                                        value={houseNo}
                                        onChange={(e)=>{setHouseName(e.target.value);
                                                        setUpdateRequired(true)}}
                                        >
                                    </input>
                        </div>
                        <div className="collection-name">
                                    <div className="collection-name-label">Address Line 2 :</div>
                                    <input
                                        type="text"
                                        placeholder="Enter Address lline 2"
                                        className="custom-input"
                                        value={streetOrCityName}
                                        onChange={(e)=>{setStreetOrCityName(e.target.value)
                                                        setUpdateRequired(true)}}
                                        >
                                    </input>
                        </div>
                        <div className="collection-name">
                                    <div className="collection-name-label">Pincode :</div>
                                    <input
                                        type="text"
                                        placeholder="Enter Pincode"
                                        className="custom-input"
                                        value={pinCode}
                                        onChange={(e)=>{setPinCode(e.target.value)
                                                        setUpdateRequired(true)}}
                                        >
                                    </input>
                        </div>
                        <div className="collection-name">
                                    <div className="collection-name-label">Phone number :</div>
                                    <input
                                        type="text"
                                        placeholder="Enter Phone number"
                                        className="custom-input"
                                        value={phoneNumber}
                                        onChange={(e)=>{setPhoneNumber(e.target.value)
                                                        setUpdateRequired(true)}}
                                        >
                                    </input>
                        </div>
                           
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="modal-footer-primary-action" onClick={handleDonateFood}><FaSave/>Continue for Donation</div>
                    <div className="modal-footer-close-btn" onClick={() => onUserDetailsPopupClose(false)}> &times; Cancel</div>
                </div>
        </div>
      </div>
    );
}

export default FetchUserDetailsPopupForDonation