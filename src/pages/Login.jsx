import { useState } from 'react'
import { supabase } from '../utils/supabase'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  async function handleLogin(e) {

    e.preventDefault()

    // Attempts login using Supabase authentication
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

   if (error) {
  console.log(error)
} else {
  // Redirects user to home page after login
  window.location.href = '/'
}
  }

   // Creates a new account
  async function handleSignup() {

    // Sends email/password to Supabase auth
    const { error } =
      await supabase.auth.signUp({
        email,
        password
      })

    if (error) {
      console.log(error)
      alert(error.message)

    } else {
      alert('Account Created')
    }
  }

  return (

    // Full login page container
    <div className='login-page'>

     {/* Login card box */}
      <div className='login-card'>

        <h1 className='login-title'>
          Practical Bookshelf
        </h1>

        <p className='login-subtitle'>
          Track your personal library and reading progress.
        </p>

        {/* Login form */}
        <form
          className='login-form'
          onSubmit={handleLogin}
        >

        {/* Email and password inputs */}
          <input
            className='form-input'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className='form-input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        {/* Login button */}
          <button
            className='primary-btn'
            type='submit'
          >
            Login
          </button>

         {/* Signup button */}
          <button
            className='secondary-btn'
            type='button'
            onClick={handleSignup}
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  )
}