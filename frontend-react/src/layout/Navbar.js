import React from 'react'
import Logo from '../Images/Logo.png'
import "../App.css"
const Navbar = () => {
  return (
    <div className='header' >
        <div><img src={Logo} alt="logo"/> </div>
    </div>
  )
}

export default Navbar
