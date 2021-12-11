import React, { useEffect, useState } from 'react'
import { PostService } from '../services/post.service'
import Post from '../common/Post/Post';
import './Feed.scss'

export default function Feed() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getPosts() {
            setPosts(await PostService.feed());
        }
        getPosts();
    }, []);

    return (
        <div className="feed row">
            {posts.map(post => (
                <Post key={post._id} data={post} />
            ))}
        </div>
    )
}
