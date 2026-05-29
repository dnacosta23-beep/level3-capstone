import { useState } from 'react'
import { supabase } from '../utils/supabase'

export default function BookForm({fetchBooks}) {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('To Read')
  const [totalPages, setTotalPages] = useState('')
  const [coverUrl, setCoverUrl] = useState('')

  async function addBook(e) {

    e.preventDefault()

    // Stops submission if title or author is empty
    if (!title || !author) {

      alert(
        'Please fill out the title and author'
      )


      return
    }

    // Gets currently logged-in user from Supabase auth
    const {data: { user }, error: userError} = await supabase.auth.getUser()

    // Prevents adding books if user is not logged in
    if (userError || !user) {

      alert('You must be logged in')

      return
    }

    // Inserts new book into Supabase database
    const { error } = await supabase.from('book').insert([
        {
          title: title.trim(),

          author: author.trim(),

          status: status,

          current_page: 0,

          total_pages:
            totalPages
              ? Number(totalPages)
              : null,

          cover_url:
            coverUrl.trim() || null,

          user_id: user.id
        }
      ])

    if (error) {

      console.log(error)

      alert('Failed to add book')

    } else {

      setTitle('')

      setAuthor('')

      setStatus('To Read')

      setTotalPages('')

      setCoverUrl('')

      fetchBooks()
    }
  }

  return (

  // Main form container

    <form
      className='book-form'
      onSubmit={addBook}
    >

    {/* Book title input */}
      <input

        className='form-input'

        type='text'

        placeholder='Book Title'

        value={title}

        onChange={(e) =>
          setTitle(e.target.value)
        }
      />
    
    {/* Author input */}
      <input

        className='form-input'

        type='text'

        placeholder='Author'

        value={author}

        onChange={(e) =>
          setAuthor(e.target.value)
        }
      />

    {/* Reading status dropdown */}
      <select

        className='form-input'

        value={status}

        onChange={(e) =>
          setStatus(e.target.value)
        }
      >

        <option value='To Read'>

          To Read

        </option>

        <option value='Currently Reading'>

          Currently Reading

        </option>

        <option value='Completed'>

          Completed

        </option>

      </select>

      {/* Total pages input */}
      <input

        className='form-input'

        type='number'

        placeholder='Total Pages'

        value={totalPages}

        onChange={(e) =>
          setTotalPages(e.target.value)
        }
      />

    {/* Optional book cover image URL */}
      <input

        className='form-input'

        type='text'

        placeholder='Cover Image URL'

        value={coverUrl}

        onChange={(e) =>
          setCoverUrl(e.target.value)
        }
      />

    {/* Submit button */}
      <button
        className='primary-btn'
        type='submit'
      >

        Add Book

      </button>

    </form>
  )
}