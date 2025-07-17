import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <main className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! This page doesn't exist.</p>
      <Link to="/" className="back-home">Back to Home</Link>
    </main>
  )
}

export default NotFound
