import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../user-context';
import { PostService } from '../services/post.service'
import Post from '../common/Post/Post';
import './Feed.scss'

export default function Feed() {

    const [posts, setPosts] = useState([]);
    const { user } = useContext(UserContext)
    useEffect(() => {
        async function getPosts() {
            setPosts(await PostService.feed());
        }
        getPosts();
    }, []);

    const deletePost = (id) =>
        async function deletePost() {
            await PostService.deletePost(id);
            setPosts(await PostService.feed());
        }
    return (
        <div className="feed row">
            {posts.map(post => (
                <Post key={post._id} data={post}>
                    <div className="d-flex justify-content-end">
                        {post.user._id === user._id &&
                            <button className="deletePostButton" onClick={deletePost(post._id)}> X </button>
                        }
                    </div>
                </Post>
            ))}
        </div>
    )
}
