import React from 'react'
import Feed from './Feed'

const Home = ({posts}) => {
  return (
    <div className='Home'>
        {posts.length ? (<Feed posts = {posts}/>): (<p style={{margin: '2rem'}}>no posts here !</p>)}
    </div>
  )
}

export default Home