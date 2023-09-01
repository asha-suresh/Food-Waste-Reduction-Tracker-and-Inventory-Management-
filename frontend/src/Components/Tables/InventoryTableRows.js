import React from 'react'
import { FaDonate, FaEdit, FaTrash } from 'react-icons/fa'
import GetRequest from '../../Service/GetRequest';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const InventoryTableRows = ({slno,id,foodName,category,quantity,consumedQuantity,updatedDate,expiryDate,status}) => {
    const userID = localStorage.getItem("userid");
    const consumeFood=()=>{
         GetRequest('consume/food?foodId='+id)
          .then(data => {
              console.log(data)});
              toast.success("Food item has been consumed!", {
                position: toast.POSITION.TOP_RIGHT
              });
            }

    const removeFood=()=>{
        GetRequest('remove/food/item?foodItemId='+id)
            .then(data => {
                console.log(data)});
                toast.success("Food item has been removed!", {
                position: toast.POSITION.TOP_RIGHT
                });
        }
            

  return (
        <div className="collections-table-row">
                    <div className="table-row-data">{slno}</div>
                    <div className="table-row-data">{foodName}</div>
                    <div className="table-row-data">{category}</div>
                    <div className="table-row-data">{quantity}</div>
                    <div className="table-row-data">{consumedQuantity}</div>
                    <div className="table-row-data">{updatedDate}</div>   
                    <div className="table-row-data">{expiryDate}</div>  
                    <div className="table-row-data">{status === "expired" ? (<span class="expired-info-banner"> {status}</span>) : (<span class="active-info-banner">{status}</span>) }</div> 
                    <div className="table-row-data">
                    {status !== 'expired' && status !== 'donated' && status !== 'consumed' ? (
                        <div className='row-action'>
                            <div className="inventory-action-btns del-key" onClick={removeFood}><FaTrash/></div>
                            </div>):(
                            <div className='row-action actions-inactive'>
                            <div className="inventory-action-btns del-key" ><FaTrash/></div>
                            </div>)
                    }

                    </div>
                    
                    <div className="table-row-data"> {status !== 'consumed' && status !== 'expired' && status !== 'donated'? (
                                        <div className="consume-primary-btn" onClick={consumeFood}>consume</div>):(<div className="consume-primary-btn-disabled">consume</div>) }</div>


            <ToastContainer closeButton={false}/>

  
            </div>  
    )
}

export default InventoryTableRows

                