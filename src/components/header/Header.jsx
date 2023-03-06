import React from 'react'
import logo from '../../img/logo.png'
import './header.css'

function Header() {
  const goTo = () => {
    window.location.href = '/'
  }
  
  return (
    <div onClick={goTo} className='header-container'>
      <img src={logo} alt="" width='350px' className="logo" />
    </div>
  )
}

export default Header
