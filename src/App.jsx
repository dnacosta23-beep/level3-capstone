import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Library from './pages/Library'
import CurrentReads from './pages/CurrentReads'
import ToRead from './pages/ToRead'

import { supabase } from './utils/supabase'

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  // Checks if a user is logged in
  async function checkUser() {
    const {data: { user }} = await supabase.auth.getUser()

    setUser(user)
    setLoading(false)
  }

  if (loading) {
    return <p>Loading...</p>
  }

   // Redirects user to login page if not logged in
  if (!user) {
    return <Navigate to='/login' />
  }

  // Shows protected page if user exists
  return children
}

// Fallback page for invalid URLs
function NotFound() {
  return (
    <div className='not-found-page'>
      <h1>Page Not Found</h1>
      <p>This page does not exist.</p>
    </div>
  )
}

// Main application component
function App() {

  return (
    <BrowserRouter>
      <Routes>

         {/* Public login page */}
        <Route path='/login' element={<Login />} />
          
        {/* Protected routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Protected Library page */}
        <Route
          path='/library'
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />

        {/* Protected Current Reads page */}
        <Route
          path='/current-reads'
          element={
            <ProtectedRoute>
              <CurrentReads />
            </ProtectedRoute>
          }
        />

        {/* Protected To Read page */}
        <Route
          path='/to-read'
          element={
            <ProtectedRoute>
              <ToRead />
            </ProtectedRoute>
          }
        />

      {/* Fallback page for invalid routes */}
      <Route path='*' element={<NotFound />} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App