import React from 'react'
import { useParams, Link } from 'react-router-dom'
import '../index.css'


const PostPage = ({posts, handleDelete, handleBack, handleEdit}) => {
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id);   
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
        <Link to={`/edit/${post.id}`}><button className="edit">Edit Post</button></Link>
    </main>
  )
}

export default PostPage