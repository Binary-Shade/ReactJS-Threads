import React from 'react'
import Thread from '../assets/threads.svg'

const Header = ({title}) => {
  return (
    <header className='Header'>
        <img className='svg' src={Thread} alt="" width={'30px'} height={"auto"}/>{title}
    </header>
  )
}

export default Header