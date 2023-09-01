import React, { useState } from 'react'
import GetRequest from '../../Service/GetRequest';
import CollectDonationPopup from '../PopupModals/CollectDonationPopup';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const DonationStatusTableRow = ({slno,id,requestCreatedUserID,createdDate,donationData,donationStatus,onUpdate}) => {

  const currentUserId = localStorage.getItem("userid");
  const isCurrentUserDonated = String(requestCreatedUserID) === currentUserId;
  console.log(isCurrentUserDonated)

  const Address =
      { "username": donationData.userName,
        "Address Line 1": donationData.houseNo ,
        "Address Line 2":donationData.streetOrCityName,
        "Pincode" : donationData.pinCode,
        "Phone Number" : donationData.phoneNo,
        "Email": donationData.email
      };

  const [isCollectDonationPopupOpen, setIsCollectDonationPopupOpen] = useState(false);


     const handleCollectDonationPopupModalOpen = () => {
      setIsCollectDonationPopupOpen(true);
     };
 

    const handleCollectDonationPopupCloseModal = (isCollected) => {
      setIsCollectDonationPopupOpen(false);
      if(isCollected){
        toast.info("Food item Collected. Thankyou!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
     };



  const clickOnGrantDonation= ()=>{
    GetRequest('update/donation/status?donationId='+id+'&status=granted')
     .then(data => {
       console.log(data)});
       onUpdate()
 }

 
const clickOnCompleteDonation= ()=>{
  GetRequest('update/donation/status?donationId='+id+'&status=completed')
   .then(data => {
     console.log(data)});
     onUpdate()
    }

  let content;

  if (!isCurrentUserDonated && donationStatus==="requested") {
    content = <div className="consume-primary-btn" onClick={clickOnGrantDonation}>Grant Donation</div>;
  } else if (isCurrentUserDonated && donationStatus==="granted") {
    content = <div className="consume-primary-btn" onClick={handleCollectDonationPopupModalOpen}>Collect Donation</div>;
  } else if (!isCurrentUserDonated && donationStatus==="collected") {
    content = <div className="consume-primary-btn" onClick={clickOnCompleteDonation}>Complete Donation</div>;
  } else {
    content = <div>No Action Required</div>;
  }

  return (
    <div className="donations-table-row">
                    <div className="table-row-data-slno">{slno}</div>
                    <div className="table-row-data-block">
                        <div className="donating-food-item-name">{donationData.foodName}</div>
                        <div className="donating-food-item-category">{donationData.category}:</div>
                        <div className="donating-food-item-quantity">{donationData.quantity}</div>
                      </div>
                    <div className="table-row-data-block">
                        <div className="donated-by">{donationData.userName}</div>
                        <div className="donated-user-email">{donationData.email}</div>
                        <div className="donation-created-date">Added on: {createdDate}</div>
                    </div>
                    <div className="table-row-data-block"> {donationStatus}</div>
                    <div className="table-row-data-block">
                    {content}

                    </div>
                    <CollectDonationPopup isCollectDonationPopupOpen={isCollectDonationPopupOpen} onCollectDonationPopupClose={handleCollectDonationPopupCloseModal} userDetails ={Address} userID ={currentUserId} donationId={id}/>
                    <ToastContainer closeButton={false}/>

    </div>  
  )
}

export default DonationStatusTableRow