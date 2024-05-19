import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPage = ({posts, editTitle, setEditTitle, editMessage, setEditMessage, handleEdit}) => {
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id);   
    useEffect(()=>{
        if(post){
            setEditTitle(post.postTitle)
            setEditMessage(post.message)
        }
    }, [post, setEditMessage, setEditTitle])
  return (
    <main className="NewPost">
        <article className="post">
            {
                post && 
                <>
                    <p>Edit Post</p>
                    <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input type="text"
                            id='postTtile'
                            value={editTitle}
                            onChange={(e)=> setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postMessage">Thread:</label>
                        <textarea name="postBody" id="postBody"
                            value={editMessage}
                            style={{resize: 'none'}}
                            onChange={(e)=>setEditMessage(e.target.value)}
                        ></textarea>
                        <button onClick={()=>handleEdit(post.id)} className='edit' type='submit'>Edit thread</button>
                    </form>
                </>
            }{
                !post && 
                <>
                    <p>post not found</p>
                </>
            }
        </article>
    </main>
  )
}

export default EditPage