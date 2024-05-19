import { Link } from "react-router-dom"
const Nav = ({search, setSearch}) => {
  return (
    <nav className="Nav">
        <form className="searchForm" onSubmit={(e)=>{e.preventDefault()}}>
            <label htmlFor="search">search post:</label>
            <input 
                type="text" 
                placeholder='search post'
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                id='search'
            />
        </form>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/post">Post</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav