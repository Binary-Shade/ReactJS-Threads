import React from 'react'
import Thread from '../assets/threads.svg'
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
const Header = ({title, width, height}) => {
  return (
    <header className='Header'>
        {console.log(width)}
        {console.log(height)}
        <img className='svg' src={Thread} alt="" width={'30px'} height={"auto"}/>{title}
        <div className="himg">
          {width < 786 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop style={{width: '40px'}} />}  
        </div>
    </header>
  )
}

export default Header