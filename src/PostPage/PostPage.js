import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostService } from '../services/post.service';
import Avatar from '../common/Avatar/Avatar';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './PostPage.scss';

export default function PostPage() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    useEffect (()=> {
        async function getPost() {
            setPost(await PostService.get(id));
        } 
        getPost();
    }, [id]);

    
    return (
        <>
            { post && (
            <div>
                <div>
                    <Avatar size="sm" image={post.user.avatar} />
                    {post.user.username}
                </div> 
            <Moment fromNow>{post.createdAt}</Moment>
            <div>{post.description}</div>
            <div>{post.size}</div>
            <div>{post.whereItIsNow}</div> 
            <Link to= {'/post/' + post._id}>
                <img src={post.image} />
            </Link>
            </div>
            )}
        </>
    );
}
