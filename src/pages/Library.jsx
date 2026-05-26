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
  
  return (
        <div>
      <Navbar />

      <h1>My Library</h1>

      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  )
}
