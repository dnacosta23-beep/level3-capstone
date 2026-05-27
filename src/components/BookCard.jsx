
export default function BookCard({ id,
  title,
  author,
  status,
  current_page,
  deleteBook,
  updateProgress 
}) {
const [currentPage, setCurrentPage] = useState(current_page || 0)

  return (
  <div>
      <h2>{title}</h2>
      <p>{author}</p>
      <span>{status}</span>

    <input
        type='number'
        value={currentPage}
        onChange={(e) =>
          setCurrentPage(e.target.value)
        }
      />
        <button onClick={() => updateProgress(id, currentPage)}>
        Update Progress
      </button>

      <button onClick={() => deleteBook(id)}>
        Delete
      </button>
    </div>
  )
}
