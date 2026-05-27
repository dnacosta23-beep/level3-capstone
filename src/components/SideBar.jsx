import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div>
        <h1>Practical Bookshelf</h1>

      <nav>

        <Link to='/'>
          Home
        </Link>

        <Link to='/library'>
          My Library
        </Link>

        <Link to='/current-reads'>
          Current Reads
        </Link>

        <Link to='/to-read'>
          To Read
        </Link>

      </nav>
    </div>
  )
}
