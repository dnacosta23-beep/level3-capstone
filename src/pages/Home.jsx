
import Sidebar from '../components/Sidebar'
import BookCard from '../components/BookCard'

import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'


export default function Home() {
const [books, setBooks] = useState([])
const [userEmail, setUserEmail] = useState('')

useEffect(() => {
    fetchHomeData()
  }, [])

async function fetchHomeData() {
  const {data: { user },error: userError} = await supabase.auth.getUser()

      if (!user) return

    setUserEmail(user.email) 


    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
    } else {
      setBooks(data)
    }
  }

  const currentReads = books.filter( (book) => book.status === 'Currently Reading')

  const recentlyAdded = books.slice(0, 4)

  const completedBooks = books.filter( (book) => book.status === 'Completed')

  const toReadBooks = books.filter( (book) => book.status === 'To Read')


  return (
    <div>
  
        <Sidebar />

      <h1>Welcome back!</h1>

        <p>Logged in as {userEmail}</p>
    
    <section>

        <div>
            <h3>Books Owned</h3>
            <p>{books.length}</p>
        </div>


        <div>
          <h3>Books Read</h3>
            <p>{completedBooks.length}</p>
        </div>

        <div>
            <h3>Current Reads</h3>
            <p>{currentReads.length}</p>
          </div>

        <div>
            <h3>To Read</h3>
            <p>{toReadBooks.length}</p>
        </div>

    </section>

    <section>
        <h2>Currently Reading</h2>

        {currentReads.length > 0 ? (currentReads.map((book) => (
                
            <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                status={book.status}
                current_page={book.current_page}
            />
            ))  ) : (

          <p>No current reads. Add some books to get started!</p>
        )}

    </section>

    <section>
          <h2>Recently Added</h2>

          <div >
            {recentlyAdded.length > 0 ? (recentlyAdded.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  status={book.status}
                  current_page={book.current_page}
                />
              ))
            ) : (
              <p>No books added yet.</p>
            )}
          </div>
        </section>
    
    </div>

  )      
}     
