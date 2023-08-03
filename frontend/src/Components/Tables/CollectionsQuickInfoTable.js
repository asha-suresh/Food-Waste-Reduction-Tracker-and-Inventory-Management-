import React from 'react'
import './style.css'
import TableRowEntry from './TableRowEntry'

const CollectionsQuickInfoTable = ({items}) => {
  
  if (items === null || items.length === 0) {
    return <p>No Food items to display.</p>;
 }
 else {
  return (
    <div className="table-container">
        <div className="table-header">
            <div className="table-column-title">Sl.no</div>
            <div className="table-column-title">Name</div>
            <div className="table-column-title">Quantity</div>
            <div className="table-column-title">Added on</div>
            <div className="table-column-title">Expires on</div>
            <div className="table-column-title">Status</div>

        </div>
        <div className="table-body-content">
        
        

        {items.map((item) => ( <TableRowEntry key={item.id} {...item}/> ))}

        </div>
    </div>
  )
}
}

export default CollectionsQuickInfoTable