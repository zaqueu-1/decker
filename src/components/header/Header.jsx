import React from "react"
import logo from "../../img/logo.png"
import "./header.css"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { US, BR } from "country-flag-icons/react/3x2"

function Header() {
  const { i18n } = useTranslation()

  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng)
      localStorage.setItem("i18nextLng", lng)
    } catch (error) {
      console.error("Error changing language:", error)
    }
  }

  return (
    <div className='header-container'>
      <Link to='/'>
        <img src={logo} alt='' width='350px' className='logo' />
      </Link>
      <div className='language-selector'>
        <button
          onClick={() => changeLanguage("en")}
          className={i18n.resolvedLanguage === "en" ? "active" : ""}
        >
          <US title='English' />
        </button>
        <button
          onClick={() => changeLanguage("pt")}
          className={i18n.resolvedLanguage === "pt" ? "active" : ""}
        >
          <BR title='Português' />
        </button>
      </div>
    </div>
  )
}

export default Header
