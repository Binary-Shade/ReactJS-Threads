import { useState, useEffect } from 'react'
import Header from './pages/Header'
import Nav from './pages/Nav'
import './index.css'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import {format} from 'date-fns'
import About from './pages/About'
import Error from './pages/Error'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Footer from './pages/Footer'
import PostPage from './pages/PostPage'


function App() {
  const [posts, setPosts] = useState([{
    id: 1,
    postTitle: 'pizza thread ',
    dateTime: '2024 May 23, 1:00 AM',
    message: 'Pizza is my second favorite thing to eat in bed.'
  },{
    id: 2,
    postTitle: 'kiss thread',
    dateTime: '2024 May 02, 12:00 PM',
    message: 'Ill kiss you in the rain so you get twice as wet'
  },{
    id: 3,
    postTitle: 'dirty thread',
    dateTime: '2024 May 12, 12:00 PM',
    message: 'Your belt looks really tight. Can I loosen it for you?'
  },{
    id: 4,
    postTitle: 'flirt thread',
    dateTime: '2024 May 12, 12:00 PM',
    message: 'Can I borrow a kiss? I promise Ill give it back.'
  }])
  
  const [search, setSearch] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postMsg, setPostMsg] = useState('')
  const navigator = useNavigate()
  const about = 'Threads is a social media application made by binary-shade . You can post your ideas and thoughts as a thread. we protect your privacy and data. Threads is made by ReactJS .We are eagerly waiting for your threads.'

  const handleSubmit = (e) =>{
    e.preventDefault()
    const id = posts.length ? posts[posts.length-1].id +1  : 1
    console.log(id);
    const dateTime = format(new Date(), 'yyyy MMMM dd, pp')
    console.log(dateTime);
    const newPost = {id, postTitle: postTitle, dateTime, message: postMsg}
    const allPosts = [...posts, newPost]
    setPosts(allPosts)
    setPostTitle('')
    setPostMsg('')
    navigator('/')
  } 

  useEffect(()=>{
    const searchLow = search.toLowerCase();
    const filteredPosts = posts.filter((post)=>
      ((post.message).toLowerCase().includes(searchLow)|| (post.postTitle).toLocaleLowerCase().includes(searchLow))
    
    )
    setSearchRes(filteredPosts.reverse())
  }, [posts, search])
  
  const handleDelete = (id) => {
    const deletePost = posts.filter(post=> post.id !== id)
    setPosts(deletePost)
    navigator('/')
  }
  const handleBack = () => {
    navigator('/')
  }

  return (
      <div className="App">
        <Header
        title = {'Threads'}
      />
      <Nav 
        search = {search}
        setSearch = {setSearch}
      />
      <Routes>
        <Route path='/' element={<Home 
            posts={searchRes}
          />} />
          
        <Route path='/post' index element={<NewPost
            postTitle = {postTitle}
            postMsg = {postMsg}
            setPostMsg = {setPostMsg}
            setPostTitle = {setPostTitle}
            handleSubmit={handleSubmit}
          />} />
        <Route path='/post/:id' element={<PostPage 
          posts={posts}
          handleDelete={handleDelete}
          handleBack={handleBack}
          />} />
        <Route path='/about' element={<About
            about={about}
          />} />  
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
      </div>
  )
}

export default App
