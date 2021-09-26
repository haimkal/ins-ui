import React, { useState, useEffect } from 'react';
import Avatar from '../../common/Avatar/Avatar';
import { UserService } from '../../services/user.service';


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
        <div className = "my-5">
            <h2>{user.username}</h2>
            <Avatar image={user.avatar} size="lg" />
            <p>{user.email}</p> 
            <p>{postsNum} dresses</p>
        </div>
    )
}
