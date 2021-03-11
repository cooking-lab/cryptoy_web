import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () =>
    <header>
        <div className="header-wrapper">
            <Link style={{ textDecoration: 'none', color: 'black' }} to='/'><div className="header-logo">Cryptoy</div></Link>
            <ul className="header-menu">
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/auction"><li>Auction</li></Link>
                <Link style={{ textDecoration: 'none', color: 'black' }} to="/login"><li className="logIn">Log In</li></Link>
            </ul>
        </div>
    </header>

export default Navigation;