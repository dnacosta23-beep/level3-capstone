import { useState } from 'react'
import { supabase } from '../utils/supabase'

export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

async function handleLogin(e) {

  e.preventDefault()

  const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

  if (error) {
    console.log(error)
  } else {
    console.log('Logged In')
  }
}

async function handleSignup() {

  const { error } =
    await supabase.auth.signUp({
      email,
      password
    })

  if (error) {
    console.log(error)
  } else {
    console.log('Account Created')
  }
}

  return (
    <div>

  <h1>Login</h1>

  <form onSubmit={handleLogin}>

    <input
      type='email'
      placeholder='Email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type='password'
      placeholder='Password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button type='submit'>
    Login
    </button>

    <button type='button' onClick={handleSignup}>
    Create Account
    </button>

  </form>

</div>
  )
}
