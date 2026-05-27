import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Navbar />
        <Sidebar />

      <h1>Welcome to Practical Bookshelf</h1>

      <p>Track your home library and reading progress.</p>
    </div>
  )
}
