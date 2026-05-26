import { useState } from 'react'
import { supabase } from '../utils/supabase'

export default function BookForm() {
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')

async function addBook(e) {
    e.preventDefault()

    const { error } = await supabase
      .from('books')
      .insert([
        {
          title: title,
          author: author,
          status: 'To Read'
        }
      ])

    if (error) {
      console.log(error)
    } else {
      setTitle('')
      setAuthor('')
    }
  }

  return (
       <form onSubmit={addBook}>
      <input
        type='text'
        placeholder='Book Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='Author'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button type='submit'>Add Book</button>
    </form>
  )
}
