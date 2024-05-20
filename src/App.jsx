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
import api from './api/axios'
import EditPage from './pages/EditPage'
import useWindow from './hooks/useWindow'

function App() {
  const [editTitle, setEditTitle] = useState('')
  const [editMessage, setEditMessage] = useState('')
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postMsg, setPostMsg] = useState('')
  const navigator = useNavigate()
  const {width, height} = useWindow()
  const about = 'Threads is a social media application made by binary-shade . You can post your ideas and thoughts as a thread. we protect your privacy and data. Threads is made by ReactJS .We are eagerly waiting for your threads.'

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const id = posts.length ? posts[posts.length-1].id +1  : 1
    console.log(id);
    const dateTime = format(new Date(), 'yyyy MMMM dd, pp')
    console.log(dateTime);
    const newPost = {id, postTitle: postTitle, dateTime, message: postMsg}
    try {
      const reponse = await api.post('/posts', newPost)
      const allPosts = [...posts, reponse.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostMsg('')
      navigator('/')
    }catch(error){
      console.log(error.message);
    }
  } 

  useEffect(()=>{
    const getRequest = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      }
      catch(error) {
        if(error.response){
          console.log(error.response.data);
          console.log(error.response.status);
        }else{
          console.log(error);
        }
      }
    }
    getRequest()
  }, [])

  useEffect(()=>{
    const searchLow = search.toLowerCase();
    const filteredPosts = posts.filter((post)=>
      ((post.message).toLowerCase().includes(searchLow)|| (post.postTitle).toLocaleLowerCase().includes(searchLow))
    )
    setSearchRes(filteredPosts.reverse())
  }, [posts, search])
  
  const handleDelete = async (id) => {
    console.log(`Attempting to delete post with id: ${id}`);
    try {
      const response = await api.delete(`/posts/${id}`);
      console.log('Delete response:', response.data);
    } catch (error) {
      console.error('Error deleting the post:', error.message);
      console.error('Full error response:', error.response);
    }
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    navigator('/');
  };
  
  const handleBack = () => {
    navigator('/')
  }

  const handleEdit = async (id) => {
    const dateTime = format(new Date(), 'yyyy MMMM dd, pp')
    const editPost = {id, postTitle: editTitle, dateTime, message: editMessage}
    const response = await api.put(`/posts/${id}`, editPost)
    setPosts(posts.map(post=> post.id === id ? {...response.data} : post))
    setPostTitle('')
    setPostMsg('')
    navigator('/')
  }


  return (
      <div className="App">
        <Header
        title = {'Threads'}
        width={width}
        height={height}
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
        <Route path='/edit/:id'
          element= {<EditPage 
            posts={posts}
            editTitle={editTitle}
            setEditTitle = {setEditTitle}
            editMessage = {editMessage}
            setEditMessage = {setEditMessage}
            handleEdit = {handleEdit}

        />}
        />
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
