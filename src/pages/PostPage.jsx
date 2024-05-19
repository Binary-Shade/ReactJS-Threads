import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const PostPage = ({posts, handleDelete, handleBack}) => {
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id);   
    const nav = useNavigate()
  return (
    <main className="PostPage">
        <button className='backBtn' onClick={handleBack}>&lt;</button>
        <article className="post">
            {
                post && 
                <>
                    <p>{post.dateTime}</p>
                    <p>{post.postTitle}</p>
                    <p>{post.message}</p>
                </>
            }{
                !post && 
                <>
                    <p>post not found</p>
                </>
            }
        </article>
        <button className='del' onClick={()=>handleDelete(post.id)}>Delete Thread</button>
    </main>
  )
}

export default PostPage