import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import BookCard from '../components/BookCard'

import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

export default function Library() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
  const {data: { user },error: userError} = await supabase.auth.getUser()

  if (userError) {
    console.log(userError)
    return
  }

  const { data, error } = await supabase.from('books').select('*').eq('user_id', user.id)

  if (error) {
    console.log(error)
  } else {
    setBooks(data)
  }
}

async function updateProgress(id, page) {
  const { error } = await supabase.from('books').update({current_page: page}).eq('id', id)

  if (error) {
    console.log(error)
  } else {
    fetchBooks()
  }
}

  return (
    <div>
      <Navbar />
      <Sidebar />

      <h1>My Library</h1>

       {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          status={book.status}
          current_page={book.current_page}
          deleteBook={deleteBook}
          updateProgress={updateProgress}
        />
      ))}
    </div>
  )
}
