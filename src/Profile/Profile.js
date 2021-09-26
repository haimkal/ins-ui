import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserService } from '../services/user.service';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import Post from '../common/Post/Post';
import './Profile.scss';

export default function Profile() {

    const { username } = useParams();
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        async function getPosts() {
           try {
                const posts = await UserService.getPosts(username);
                setPosts(posts);
                console.log(posts);
           }
           catch (err) {
               console.log(err);
           }
        }
        getPosts();
    }, [username]);
    
    return (
        <div>
            <ProfileHeader username = {username} postsNum = {posts.length}/>
            <hr />
            <div className="row">
                {posts.map(post => (
                    <Post key={post._id} data={post} />
                ))}
            </div>
        </div>  
    )
}
