import React from 'react';
import GetRequest from '../../Service/GetRequest';


const CollectDonationPopup = ({ isCollectDonationPopupOpen, onCollectDonationPopupClose,userDetails,userID,donationId}) => {

    const clickOnCollectDonation= ()=>{
        GetRequest('update/donation/status?donationId='+donationId+'&status=collected')
         .then(data => {''
           console.log(data)});
           onCollectDonationPopupClose(true);
          }
      
    console.log("collection popup value is", isCollectDonationPopupOpen);

    if (!isCollectDonationPopupOpen) return null;
    return (
        <div className="modal-container">
            <div className="modal-area">
                <div className="modal-header">
                    <div className="modal-header-label-section">
                        <div className="modal-heading-label">Collect Donation</div>
                    </div>
                </div>
                <hr />

                <div className="modal-content">
                    <div className="collection-edit-quick-info">
                        <div className="collection-edit-column2">
                            <div className="collection-name">
                                <div className="collection-name-label">
                                            Please Collect Food Item from the below Address                                    <br/>
                                            <br/>

                                    <div>
                                        <p>Username: {userDetails.username}</p>
                                        <p>Address Line 1: {userDetails["Address Line 1"]}</p>
                                        <p>Address Line 2: {userDetails["Address Line 2"]}</p>
                                        <p>Pincode: {userDetails.Pincode}</p>
                                        <p>Phone Number: {userDetails["Phone Number"]}</p>
                                        <p>Email: {userDetails.Email}</p>
                                    </div>
                                    <br/>
                                    once you have collected, please come back and mark as collected
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="modal-footer-primary-action" onClick={clickOnCollectDonation} >Mark as Collected</div>
                    <div className="modal-footer-close-btn" onClick={() => onCollectDonationPopupClose(false)}> &times; Close</div>
                </div>
            </div>
        </div>
    );
}

export default CollectDonationPopup;
