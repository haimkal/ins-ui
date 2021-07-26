import React from 'react';
import './Header.scss';
import HeaderAvatar from './HeaderAvatar/HeaderAvatar';

export default function Header(props) {
    return (
            <header className="Header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container justify-content-start">
                            <a className="navbar-brand" href="/">Nechavot Style </a>
                            <ul className="nav ml-auto">
                                 <HeaderAvatar />
                            </ul> 
                     </div>
                </nav>
            </header>
    );
}
