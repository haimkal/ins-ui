import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PostService } from '../services/post.service';
import Avatar from '../common/Avatar/Avatar';
import { UserContext } from '../user-context';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './PostPage.scss';

export default function PostPage() { // checking dress.size and undefined
    
    const history = useHistory()
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [takenByMe, setTakenByMe] = useState(false);
    const { user }  = useContext(UserContext);

    async function handleClick() {
        console.log('I took the dress!');
        setTakenByMe(true);
        const myUsername = user.username;
        const updatedPost = await PostService.takenByMe(id, myUsername);
        history.push(`/`);
    }

    useEffect (()=> {
        async function getPost() {
            try {
                const post = await PostService.get(id);
                if(post) {
                    setPost(post);
                } else {
                    console.log('Post does not exist!');
                    // history.push('/'); // check if it works well
                }
            } catch (err) {
                console.log(err);
            } 
        } 
        getPost();
    }, [id]);

    

    
    return (
    <div className= "PostPage">
        { post && <div className="row pageContainer">
            <div className="col-md-2">
                <header>
                    <div className="PostPage__user">
                        <Avatar className = "Avatar" size="md" image={post.user.avatar} />
                        <div className="PostPage__username">{post.user.username}</div>
                    </div> 
                </header> 
            </div>
            <div className="col-md-8">
                <div className="PostPage__date">
                    <Moment fromNow className="PostPage__moment">{post.createdAt}</Moment>
                </div>
                <Link to= {'/post/' + post._id}>
                    <img className="PostPage__image" src={post.image} alt = "dress" />
                </Link>
                <div className="PostPage__details">
                    <div className="PostPage__sizeAndTakenBy">
                         { (post.size)  && <div className="PostPage__size">Dress size: {post.size} </div>}
                         <div className="PostPage__curretnlyTakenBy">Currently taken by: {post.whereItIsNow} </div>
                    </div>
                    <div className="PostPage__content">
                        <p className="PostPage__description">{post.description}</p> 
                    </div>
                </div>
            </div>
            <div className="btn-container col-md-2">
                <button className= {takenByMe ? "btn active" : "btn"} onClick = {handleClick}>
                        I took that dress !
                </button>
            </div>
        </div>}
    </div>
    );
}
