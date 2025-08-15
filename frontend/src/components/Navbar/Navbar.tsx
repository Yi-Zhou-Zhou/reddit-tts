import { Link } from '@tanstack/react-router'
const Navbar = () => {
  return (
    <nav>
      <div className="py-2 px-4 flex gap-2 items-center justify-between border-b border-light-gray-100">
        <Link to="/" className="[&.active]:font-bold font-fascinate">
          Reddit-tts
        </Link>{' '}
        <div>
          {/* <Link to="/favorites" className="[&.active]:font-bold">
            Favorites
          </Link> */}
        </div>
        <Link to="/profile" className="[&.active]:font-bold w-[40px] h-[40px] bg-black rounded-3xl">
        {/* Temporal user logo */}

        </Link>
     
      </div>
    </nav>
  )
}

export default Navbar
