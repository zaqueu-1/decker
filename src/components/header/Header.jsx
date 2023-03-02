import React from 'react'
import logo from '../../img/logo.png'
import './header.css'

function Header() {
  return (
    <div className='header-container'>
      <img src={logo} alt="" width='350px' className="logo" />
    </div>
  )
}

export default Header
