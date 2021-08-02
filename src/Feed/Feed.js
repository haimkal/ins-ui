import React, { useEffect } from 'react'
import { PostService } from '../services/post.service'
import './Feed.scss'

export default function Feed() {

    useEffect (()=> {
        PostService.feed()
            .then(posts => console.log(posts));
    }, [])
    return (
        <div className="feed">
            Feed!
        </div>
    )
}
