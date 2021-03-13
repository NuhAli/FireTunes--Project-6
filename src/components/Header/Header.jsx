import React from 'react'
import './Header.scss'
import { AiOutlineFire } from 'react-icons/ai'
import {FaBars} from 'react-icons/fa';

// Header Component(functional)
const Header = (props) => {
    return (
        <header>
            <div className="container">
                <div className="menu-toggle">
                    <FaBars className="menu-icon" onClick={props.onclick} />
                </div>
                <div className="title">
                    <h1>
                        FireTunes
                    </h1>
                </div>
                <div className="title-icon">
                    <AiOutlineFire className="react-icons" />
                </div>
            </div>
            <div className="border-bottom">
            </div>
        </header>
    )
}

export default Header
