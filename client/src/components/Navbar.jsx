import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.avif'
const Navbar = () => {
  return (
    <nav className='flex items-center justify-between  text-white bg-[rgb(79,129,189)] w-screen'>
        <div className='flex items-center justify-between w-full  max-w-[1100px] mx-auto'>
            <div className=' flex items-center justify-center rounded-full'>
                <img src={logo} alt="" className='w-[100px] h-[100px] rounded-full'/>
            </div>

            <ul className='flex items-center justify-center space-x-4'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/service'>Service</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </div>    
            
            </nav>
  )
}

export default Navbar