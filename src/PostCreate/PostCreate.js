import React from 'react'
import './PostCreate.scss'
export default function PostCreate() {
    return (
        <div>
            <h1>Create Post</h1>
            <input type="file" />
            <textarea></textarea>
        
            <label for="size">size:</label>
            <input type="text" id="size" name="size" required />

            <button>Send</button>
        </div>
    )
}
