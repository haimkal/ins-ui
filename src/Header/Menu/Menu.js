import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Menu.scss'

export default function Menu() {
    return (
        <ul className="navbar-nav">
            <li className="navbar-item">
                  <Link to="/post/create"className="createIcon">
                      <FontAwesomeIcon icon={faPlus} />
                  </Link>
            </li>
        </ul>
    )
}
