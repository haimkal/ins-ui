import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HeaderAvatar from './HeaderAvatar/HeaderAvatar';
import { Link } from 'react-router-dom'; 
import Menu from './Menu/Menu';
import { UserContext } from '../user-context';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Header(props) {
    return (
            <header className="Header">
                <nav className="navbar navbar-expand-lg ">
                    <div className="container header-container">
                        <Link to="/" className="nav-link d-md-none">
                            <FontAwesomeIcon icon={faHome}/>
                        </Link>
                        <Link to="/" className="navbar-brand d-none d-md-block">
                            Nechavot Style
                        </Link>
                        <Menu />
                        <div className="nav ml-auto mx-3">        
                                    <HeaderAvatar />
                        </div> 
                    </div>
                </nav>
            </header>
    );
}
