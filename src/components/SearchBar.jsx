import { FaSearch } from 'react-icons/fa'

export default function SearchBar({ search, setSearch }) {
  
    return (
    <div className='search-bar-container'>
        
        {/* Search icon */}
      <FaSearch className='search-icon' />

      <input
        className='search-bar'
        type='text'
        placeholder='Search books...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}