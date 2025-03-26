import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/common/Loading'
import CodeBlockCard from '../components/code/CodeBlockCard'
import { codeBlockApi } from '../server/api'

const LobbyPage = () => {
  const navigate = useNavigate()
  const [codeBlocks, setCodeBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const data = await codeBlockApi.getAll()
        setCodeBlocks(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCodeBlocks()
  }, [])

  if (loading) return <Loading />
  if (error) return <div className="text-red-600 text-center">{error}</div>

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 animate-gradient-x">
            JavaScript Code Blocks
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {codeBlocks.map((block) => (
            <CodeBlockCard key={block._id} block={block} />
          ))}
          
          <div
            onClick={() => navigate('/code-block/new')}
            className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex items-center justify-center min-h-[100px] bg-white border-2 border-dashed border-gray-300 hover:border-blue-500 group"
          >
            <div className="text-center">
              <div className="flex justify-center">
                <svg
                  className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-600 group-hover:text-blue-500 transition-colors duration-200">
                Create New Code Block
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Playful background elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 opacity-20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>
    </div>
  )
}

export default LobbyPage