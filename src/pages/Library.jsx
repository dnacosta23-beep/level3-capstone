import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '../utils/supabase'

export default function Library() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    const { data, error } = await supabase
      .from('books')
      .select('*')

    if (error) {
      console.log(error)
    } else {
      setBooks(data)
    }
  }

  async function deleteBook(id) {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', id)

  if (error) {
    console.log(error)
  } else {
    fetchBooks()
  }
}

async function updateProgress(id, page) {
  const { error } = await supabase
    .from('books')
    .update({
      current_page: page
    })
    .eq('id', id)

  if (error) {
    console.log(error)
  } else {
    fetchBooks()
  }
}

  return (
    <div>
      <Navbar />

      <h1>My Library</h1>

       {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          status={book.status}
          deleteBook={deleteBook}
        />
      ))}
    </div>
  )
}
