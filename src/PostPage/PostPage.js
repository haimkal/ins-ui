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
    
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [takenByMe, setTakenByMe] = useState(false);
    const { user }  = useContext(UserContext);
    // const history = useHistory();

    async function handleClick() {
        console.log('I took the dress!');
        const myUsername = user.username;
        
        const updatedPost = await PostService.takenByMe(id, myUsername);

        
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
                        <Avatar size="md" image={post.user.avatar} />
                        <h3 className="PostPage__user__username">{post.user.username}</h3>
                    </div> 
                </header> 
            </div>
            <div className="col-md-8">
                <Link to= {'/post/' + post._id}>
                    <img className="PostPage__image" src={post.image} alt = "dress" />
                </Link>
                <div className="PostPage__details">
                    <div className="PostPage__sizeAndTakenBy">
                         { (post.size)  && <h4 className="PostPage__size">Dress size: {post.size} </h4>}
                         <h4 className="PostPage__currtenlyTakenBy">Currtenly taken by: {post.whereItIsNow} </h4>
                    </div>
                    <div className="PostPage__content">
                        <p className="PostPage__description">{post.description}</p> 
                    </div>
                    <div className="PostPage__date">
                        <Moment fromNow className="PostPage__moment">{post.createdAt}</Moment>
                    </div>
                </div>
            </div>
            <div className="col-md-2">
                <button className= {takenByMe ? "takenByMe active" : "takenByMe"} onClick = {handleClick}>
                        I took that dress !
                </button>
            </div>
        </div>}
    </div>
    );
}
