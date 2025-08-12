import { Link } from '@tanstack/react-router'
const Navbar = () => {
  return (
    <nav>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
      <hr />
    </nav>
  )
}

export default Navbar
