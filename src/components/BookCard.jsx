
export default function BookCard({ id, title, author, status, deleteBook }) {
  return (
  <div>
      <h2>{title}</h2>
      <p>{author}</p>
      <span>{status}</span>

      <button onClick={() => deleteBook(id)}>
        Delete
      </button>
    </div>
  )
}
