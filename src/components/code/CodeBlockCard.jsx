import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { codeBlockApi } from '../../server/api'

const CodeBlockCard = ({ block }) => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const handleEdit = () => {
    navigate(`/code-block/${block._id}/edit`)
  }
  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this code block?')) return
   
    try {
      await codeBlockApi.delete(block._id)
      // Refresh the page to update the list
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete code block:', error)
    }
  }
  
  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="relative">
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-14 right-4 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20 overflow-hidden">
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        )}

        
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-100 to-blue-100 opacity-50 -z-10"></div>
      </div>

      {/* Card Content */}
      <Link to={`/code-block/${block._id}`} className="block p-6 pt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
          {block.title}
        </h2>
        <div className="text-gray-500 text-sm flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Created: {new Date(block.createdAt).toLocaleDateString()}
        </div>
      </Link>
    </div>
  )
}

export default CodeBlockCard