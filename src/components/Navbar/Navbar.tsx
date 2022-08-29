import React, { FC } from 'react'
import './Navbar.css'

type NavProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar:FC<NavProps> = ({setShowModal}) => {
  return (
    <div className='navbar'>
      <div className='container d-flex justify-between'>
        <h1 className='title'>Event Tracker</h1>
        <button className='btn btn-clear' onClick={() => setShowModal(true)}><span className="btn-font">Add New Event</span></button>
      </div>
    </div>
  )
}

export default Navbar