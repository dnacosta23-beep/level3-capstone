import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import BookCard from '../components/BookCard'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'

import { supabase } from '../utils/supabase'

export default function CurrentReads() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    setLoading(true)

     // Gets the currently logged-in user
    const {data: { user },error: userError} = await supabase.auth.getUser()

    if (userError || !user) {
      console.log(userError)
      setLoading(false)
      return
    }

    // Fetches books from the "book" table
    // Only returns books owned by this user
    // Only returns books with status "Currently Reading"
    const { data, error } = await supabase
      .from('book')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'Currently Reading')

    if (error) {
      console.log(error)
    } else {
      setBooks(data)
    }

    setLoading(false)
  }

  // Deletes a book after user confirmation
  async function deleteBook(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this book?'
    )
    
    // Stops delete if user clicks Cancel
    if (!confirmed) return

    const { error } = await supabase
      .from('book')
      .delete()
      .eq('id', id)

    if (error) {
      console.log(error)
    } else {
      fetchBooks()
    }
  }

   // Updates the current page number for a book
async function updateProgress(id, page) {
  const { error } = await supabase
    .from('book')
    .update({
      current_page: Number(page)
    })
    .eq('id', id)

  if (error) {
    console.log(error)
  } else {
    fetchBooks()
  }
}

   // Updates a book's reading status
  async function updateStatus(id, newStatus) {
  const { error } = await supabase
    .from('book')
    .update({
      status: newStatus
    })
    .eq('id', id)

  if (error) {
    console.log(error)
  } else {
    fetchBooks()
  }
}
    
    // Filters visible books based on title or author search
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )


  return (
    <div className='app-layout'>
      <Sidebar />

      <div className='main-content'>
        <section className='page-header'>
          <h1>Current Reads</h1>
          <p>Books you are currently reading.</p>

        </section>

         {/* Search bar */}
        <div className='toolbar'>
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* Loading state or book grid */}
        {loading ? (
          <p>Loading current reads...</p>
        ) : (
          <div className='library-grid'>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
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
                  deleteBook={deleteBook}
                  updateProgress={updateProgress}
                  updateStatus={updateStatus}
                />
              ))
            ) : (
              <p>No current reads found.</p>
            )}
          </div>
        )}

        <Footer />
      </div>
    </div>
  )
}