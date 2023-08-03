import React from 'react'
import Header from '../../Components/Header'
import Sidetag from '../../Components/Sidetag'

function Dashborad() {
  return (
    <div>
      <Header></Header>
      <Sidetag></Sidetag>
      <div className="graph"></div>
      <div className="box"></div>
      <div className="comment"></div>
    </div>
  )
}

export default Dashborad
