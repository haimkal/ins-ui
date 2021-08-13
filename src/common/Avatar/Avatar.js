import React from 'react'
import PropTypes from 'prop-types';
import avatarDefault from './avatar-nechavot-style.png';
import './Avatar.scss'

export default function Avatar(props) {

    const image = props.image || avatarDefault;
    const size = props.size || 'md';
    const className = 'Avatar--' + size;
    
    return (
        <img src={image} alt="avatar" className= {"Avatar " + className}  />   
    );
}

Avatar.propTypes= {
        size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

