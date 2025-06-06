import React, { useState } from 'react'
import Sidebar from '../UI/sidebar/Sidebar'

function Header() {
    const [sidebar_open, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebar_open)
    }

    return (
        <>
            <div className='rounded-full h-[50px] bg-blue-400 m-3 p-2 flex justify-between items-center text-white text-xl font-bold px-8 shadow-lg shadow-blue-200'>
                <div className='cursor-pointer' onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#fff" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1" /></svg>
                </div>
                <h1>KaspiDemp</h1>
                <div></div>
            </div>
            <Sidebar open={sidebar_open} />
        </>
    )
}

export default Header