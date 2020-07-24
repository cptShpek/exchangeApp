import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {

    return(
        <nav className="nav-wrapper blue darken-3">
            <Link to="/" className="brand-logo center">ShpekExchenge</Link>
            <ul className="left grey-text">
                <li><Link to="/exchange">Currency Exchange</Link></li>
                <li><Link to="/currency">Currency Rates</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar