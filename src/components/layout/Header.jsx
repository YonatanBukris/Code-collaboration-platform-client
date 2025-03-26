import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center h-16 items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Code Collaboration
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header 