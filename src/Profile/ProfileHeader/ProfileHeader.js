import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 
import Avatar from '../../common/Avatar/Avatar';
import { UserService } from '../../services/user.service';
import './ProfileHeader.scss'


export default function ProfileHeader({username, postsNum}) {
    
    const [user, setUser] = useState({});
    
    useEffect(() => {
        async function getUser() {
           try {
                const user = await UserService.getUser(username);
                setUser(user);
                console.log(user);
           }
           catch (err) {
               console.log(err);
           }
        }
        getUser();
    }, [username]);
    
    return (
        <div className= "ProfileHeader-container d-flex">
            <div className="my-5">
                <h1 className="username">{user.username}</h1>
                <Avatar image={user.avatar} size="lg" />
                <p className="email">{user.email}</p> 
                <p className="postsNum">{postsNum} dresses</p>
            </div>
            <div className="editContainer">
                <Link to="/user/edit" className="pencilEdit nav-link">
                    <FontAwesomeIcon icon={faPencil} className="fa-3x faPencil"/>
                    <p className="text">Edit your profile</p>
                </Link>
            </div>
        </div>
    )
}
