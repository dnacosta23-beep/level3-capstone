
import Sidebar from '../components/Sidebar'

import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

export default function ToRead() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    const {data: { user },error: userError} = await supabase.auth.getUser()

    if (userError) {
      console.log(userError)
      return
    }

    const { data, error } = await supabase.from('books').select('*').eq('user_id', user.id).eq('status', 'to-read')

    if (error) {
      console.log(error)
    } else {
      setBooks(data)
    }
  }

  async function deleteBook(id) {

    const { error } = await supabase.from('books').delete().eq('id', id)

    if (error) {
      console.log(error)
    } else {
      fetchBooks()
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


 const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
        <Sidebar />

       <h1>To Read</h1>

<SearchBar search={search} setSearch={setSearch} />

    {filteredBooks.map((book) => (

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
