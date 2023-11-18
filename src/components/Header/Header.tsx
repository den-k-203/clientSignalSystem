import React, { useState } from "react"
import { useLocation, Outlet, Link } from 'react-router-dom';
import './style/index.scss'
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };


    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className={`btn-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        {!isOpen  ? ( 
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg> ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg> 
                            )
                        }
                        <span className="context-btn-burger">
                            MENU
                        </span>
                    </div>
                    <div>
                        <img className="logo" src={require("../../assets/logo.png")}></img>
                    </div>
                    <div className="header-tools">
                        <Link to='/contacts'>
                            Контакти
                        </Link>
                    </div>
                </div>
            </header>
            {!isOpen  ? (<></>) : (
                 <BurgerMenu/>
            )
            }
            <Outlet/>
        </>
    )
}

export default Header