import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../user-context';
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './Post.scss';
import { PostService } from '../../services/post.service';

export default function Post({ data }) {
    const history = useHistory();
    const { user } = useContext(UserContext)

    async function deletePost() {
        history.push(`/profile/${user.username}`); 
        return await PostService.deletePost(data._id);
    }
    return (

        <div className="col-12 col-md-4 ">
                <article className="Post">
                    <header>
                        <div className="Post__user">
                            <Avatar className="Post__user__avatar" size="sm" image={data.user.avatar} />
                            <h3 className="Post__user__username">{data.user.username}</h3>
                        </div>
                        <div className="Post__date">
                            <Moment fromNow className="Post__moment">{data.createdAt}</Moment>
                        </div>
                    </header>
                    <div className="Post__image">
                        <Link to={'/post/' + data._id}>
                            <img className="Post__image" src={data.image} alt="dress" />
                        </Link>
                    </div>
                    <div className="Post__content">
                        <p className="Post__description">{data.description}</p>
                        <div className="Post__CurrentlyTakenBy">Currently taken by:<strong> {data.whereItIsNow}</strong></div>
                    </div>
                    <div className="d-flex justify-content-end">
                        {data.user._id === user._id && <button className="deletePostButton" onClick={deletePost}> X </button>}
                    </div>
                </article>
        </div>

    )
}
