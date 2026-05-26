export default function BookCard({ title, author, status }) {
  return (
  <div>
      <h2>{title}</h2>
      <p>{author}</p>
      <p>{status}</p>
    </div>
  )
}
