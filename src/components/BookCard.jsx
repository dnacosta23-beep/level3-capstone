import { useEffect, useState } from 'react'

export default function BookCard({
  id,
  title,
  author,
  status,
  current_page,
  total_pages,
  created_at,
  cover_url,
  deleteBook,
  updateProgress,
  updateStatus
}) {
  const [currentPage, setCurrentPage] = useState(current_page || 0)

  useEffect(() => {
    setCurrentPage(current_page || 0)
  }, [current_page])

  const currentPageNumber = Number(currentPage)
  const totalPagesNumber = Number(total_pages)

  // Calculates reading percentage based on current page and total pages
  const progressPercent =
    totalPagesNumber > 0
      ? Math.min(
          100,
          Math.round(
            (currentPageNumber / totalPagesNumber) * 100
          )
        )
      : 0

  // Formats database timestamp into readable date
  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString()
    : 'Unknown'

  return (
    <div className='book-card'>
      {/* Book cover image or placeholder */}
      {cover_url ? (
        <img
          className='book-cover'
          src={cover_url}
          alt={`${title} cover`}
        />
      ) : (
        <div className='book-cover'></div>
      )}

      {/* Book information section */}
      <div className='book-info'>
        <h2>{title}</h2>

        <p>{author}</p>

        <p className='created-date'>
          Added: {formattedDate}
        </p>

        {/* Current reading status badge */}
        <span className='status-badge'>
          {status}
        </span>

        {/* Dropdown only appears if updateStatus exists */}
        {updateStatus && (
          <select
            className='form-input'
            value={status}
            onChange={(e) => updateStatus(id, e.target.value)}
          >
            <option value='To Read'>To Read</option>
            <option value='Currently Reading'>Currently Reading</option>
            <option value='Completed'>Completed</option>
          </select>
        )}

        <p className='progress-text'>
          {progressPercent}% Complete
        </p>

        {/* Progress bar */}
        <div className='progress-bar'>
          <div
            className='progress-fill'
            style={{
              width: `${progressPercent}%`
            }}
          ></div>
        </div>
      </div>

      {/* Only shows progress updater if updateProgress exists */}
      {updateProgress && (
        <div className='progress-area'>
          <label>Current Page</label>

          {/* Page number input */}
          <input
            className='page-input'
            type='number'
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
          />

          <button
            className='primary-btn'
            onClick={() => updateProgress(id, currentPage)}
          >
            Update Progress
          </button>
        </div>
      )}

      {/* Delete button only appears if deleteBook exists */}
      {deleteBook && (
        <button
          className='delete-btn'
          onClick={() => deleteBook(id)}
        >
          Delete
        </button>
      )}
    </div>
  )
}