import React from 'react'
import avatarDefault from './avatar-nechavot-style.png';
export default function Avatar(props) {

    const image = props.image || avatarDefault;
    return (
        <div>
           <img src={image} /> 
        </div>
    )
}
