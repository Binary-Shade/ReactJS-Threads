import React from 'react'

const NewPost = ({postTitle, setPostTitle, postMsg, setPostMsg, handleSubmit}) => {
  return (
    <main className="NewPost">
        <form className='newPostForm' onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="postTitle">Title:</label>
            <input type="text"
                required
                id='postTtile'
                value={postTitle}
                onChange={(e)=> setPostTitle(e.target.value)}
            />
            <label htmlFor="postMessage">Thread:</label>
            <textarea name="postBody" id="postBody"
                value={postMsg}
                required
                style={{resize: 'none'}}
                onChange={(e)=>setPostMsg(e.target.value)}
            ></textarea>
            <button className='add' type='submit'>Add thread</button>
        </form>
    </main>
  )
}

export default NewPost