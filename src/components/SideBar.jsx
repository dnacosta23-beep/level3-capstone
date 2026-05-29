import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from '../utils/supabase'


// Sidebar icons from react-icons
import {
  FaHome,
  FaBook,
  FaBookmark,
  FaBookOpen,
  FaBars,
  FaSignOutAlt
} from 'react-icons/fa'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    getUser()
  }, [])

  // Gets logged-in user from Supabase auth
  async function getUser() {
    const {data: { user }} = await supabase.auth.getUser()

    if (user) {
      setUserEmail(user.email)
    }
  }

  
 async function handleLogout() {
  // Ends the Supabase login session
  await supabase.auth.signOut()

  // Redirects user to login page
  window.location.href = '/login'
}

 return (

    // Main sidebar container
    // Adds "collapsed" class if sidebar is collapsed
  <div className={collapsed ? 'sidebar collapsed' : 'sidebar'}>


    {/* Collapse/expand sidebar button */}      
    <button
      className='collapse-btn'
      onClick={() => setCollapsed(!collapsed)}
    >

    {/* Sidebar menu icon */}
      <FaBars />
    </button>

   {/* Sidebar title only appears when expanded */}
    {!collapsed && (
      <h1 className='sidebar-title'>
        Practical Bookshelf
      </h1>
    )}

    {/* Navigation links */}
    <nav className='sidebar-nav'>

      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'sidebar-link active-link'
            : 'sidebar-link'
        }
        to='/'
      >

         {/* Home link */}
        <FaHome />

         {/* Text disappears when sidebar collapses */}
        {!collapsed && <span>Home</span>}
      </NavLink>

        {/* Library link */}
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'sidebar-link active-link'
            : 'sidebar-link'
        }
        to='/library'
      >
        <FaBook />
        {!collapsed && <span>My Library</span>}
      </NavLink>

     {/* Current Reads link */}
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'sidebar-link active-link'
            : 'sidebar-link'
        }
        to='/current-reads'
      >
        <FaBookOpen />
        {!collapsed && <span>Current Reads</span>}
      </NavLink>

         {/* To Read link */}
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'sidebar-link active-link'
            : 'sidebar-link'
        }
        to='/to-read'
      >
        <FaBookmark />
        {!collapsed && <span>To Read</span>}
      </NavLink>

    </nav>

        {/* Bottom sidebar user section */}
    <div className='sidebar-user'>

 {/* User email only appears when expanded */}
      {!collapsed && (
        <p className='user-email'>
          {userEmail}
        </p>
      )}

    {/* Logout button */}   
      <button
        className='logout-btn'
        onClick={handleLogout}
      >
        <FaSignOutAlt />

 {/* Logout text hidden when collapsed */}
        {!collapsed && (
          <span>Logout</span>
        )}
      </button>

    </div>

  </div>
)
}