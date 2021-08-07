import React from 'react'
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default function Post({ data }) {

    return (
        <div className = "Post">  
            <div>
                <Avatar size="sm" image={data.user.avatar} />
                {data.user.username}
            </div> 
           <Moment fromNow>{data.createdAt}</Moment>
           <div>{data.description}</div>
           <div>{data.size}</div>
           <div>{data.whereItIsNow}</div> 
           <Link to= {'/post/' + data._id}>
               <img src={data.image} />
           </Link>
        </div>
    )
}
