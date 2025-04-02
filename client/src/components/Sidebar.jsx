import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside>
        <div className='flex flex-col items-start justify-start  p-4 '>
            <ul className='flex flex-col items-start text-left justify-start space-y-4 w-full'>
                <li className='text-[20px] px-1 bg-gray-800 w-full block text-left text-white py-2'><Link to='/users'>Users</Link></li>
                <li className='text-[20px] px-1 bg-gray-800 w-full block text-left text-white py-2'><Link to='/grade'>grade</Link></li>
                <li className='text-[20px] px-1 bg-gray-800 w-full block text-left text-white py-2'><Link to='/section'>section</Link></li>
                <li className='text-[20px] px-1 bg-gray-800 w-full block text-left text-white py-2'><Link to='/teacher'>teacher</Link></li>
                <li className='text-[20px] px-1 bg-gray-800 w-full block text-left text-white py-2'><Link to='/student'>student</Link></li>
                
            </ul>
        </div>
    </aside>
  )
}

export default Sidebar