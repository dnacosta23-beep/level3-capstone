import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import BookCard from '../components/BookCard'
import Footer from '../components/Footer'

import { supabase } from '../utils/supabase'

export default function Home() {
  const [books, setBooks] = useState([])
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomeData()
  }, [])

   // Fetches logged-in user and their books
  async function fetchHomeData() {
    setLoading(true)
    
    // Gets the currently logged-in user
    const {data: { user }, error: userError} = await supabase.auth.getUser()

    if (userError || !user) {
      console.log(userError)
      setLoading(false)
      return
    }

     // Saves user's email for welcome message
    setUserEmail(user.email)

    // Fetches all books that belong to this user
    // Newest books appear first
    const { data, error } = await supabase
      .from('book')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
    } else {
      setBooks(data)
    }

    setLoading(false)
  }

   // Books currently being read
  const currentReads = books.filter(
    (book) => book.status === 'Currently Reading'
  )

   // First 4 books from newest-to-oldest list
  const recentlyAdded = books.slice(0, 4)

  // Books marked as completed
  const completedBooks = books.filter(
    (book) => book.status === 'Completed'
  )

   // Books marked as To Read
  const toReadBooks = books.filter(
    (book) => book.status === 'To Read'
  )

  return (
    <div className='app-layout'>
      <Sidebar />

      <div className='main-content'>
        <section className='welcome-section'>
          <h1>Welcome back!</h1>
          <p>Logged in as {userEmail}</p>
        </section>

        {/* Shows loading message while Supabase data loads */}
        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>

          {/* Dashboard stat cards */}
            <section className='stats-grid'>
              <div className='stat-card'>
                <h3>Books Owned</h3>
                <p>{books.length}</p>
              </div>

              <div className='stat-card'>
                <h3>Books Read</h3>
                <p>{completedBooks.length}</p>
              </div>

              <div className='stat-card'>
                <h3>Current Reads</h3>
                <p>{currentReads.length}</p>
              </div>

              <div className='stat-card'>
                <h3>To Read</h3>
                <p>{toReadBooks.length}</p>
              </div>
            </section>

            {/* Currently Reading preview section */}
            <section className='page-section'>
              <h2>Currently Reading</h2>

              <div className='library-grid'>
                {currentReads.length > 0 ? (
                  currentReads.map((book) => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        status={book.status}
                        current_page={book.current_page}
                        total_pages={book.total_pages}
                        created_at={book.created_at}
                        cover_url={book.cover_url}
                    />
                  ))
                ) : (
                  <p>No current reads. Add some books to get started!</p>
                )}
              </div>
            </section>

            {/* Recently Added preview section */}
            <section className='page-section'>
              <h2>Recently Added</h2>

              <div className='library-grid'>
                {recentlyAdded.length > 0 ? (
                  recentlyAdded.map((book) => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        status={book.status}
                        current_page={book.current_page}
                        total_pages={book.total_pages}
                        created_at={book.created_at}
                        cover_url={book.cover_url}
                    />
                  ))
                ) : (
                  <p>No books added yet.</p>
                )}
              </div>
            </section>
          </>
        )}

        <Footer />
      </div>
    </div>
  )
}