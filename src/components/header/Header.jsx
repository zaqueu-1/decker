import React from 'react'
import logo from '../../img/logo.png'
import './header.css'
import { Link } from 'react-router-dom';
 

function Header() {
  
  
  return (
    <div className='header-container'>
      <Link to='/'><img src={logo} alt="" width='350px' className="logo" /></Link>
      {window.location.pathname === '/' ? (
        <Link to='/life' ><button className="lifecounter-btn">Contador de Vida</button></Link>)
      : null}
    </div>
  )
}

export default Header
