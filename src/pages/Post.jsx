import React from 'react'
import { Link } from 'react-router-dom'
const Post = ({post}) => {
  return (
    <article className="post">
        <Link to={`/post/${post.id}`}>
            <h2>{post.postTitle}</h2>
            <p className="postDate">{post.dateTime}</p>
        </Link>
        <p className="postBody">
            {
                post.message.length <= 25 ? post.message : (`${post.message.slice(0,25)}...`)
            }
        </p>
    </article>
  )
}

export default Post