import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/common/Loading'
import CodeBlockForm from '../components/code/CodeBlockForm'
import { codeBlockApi } from '../server/api'

const CodeBlockFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [codeBlock, setCodeBlock] = useState(null)
  const [loading, setLoading] = useState(!!id) // Only load if we're editing
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCodeBlock = async () => {
      if (!id) return

      try {
        const data = await codeBlockApi.getById(id)
        setCodeBlock(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCodeBlock()
  }, [id])

  const handleSubmit = async (formData) => {
    try {
      if (id) {
        await codeBlockApi.update(id, formData)
      } else {
        await codeBlockApi.create(formData)
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  if (loading) return <Loading />
  if (error) return <div className="text-red-600 text-center">{error}</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {id ? 'Edit Code Block' : 'Create New Code Block'}
      </h1>
      <CodeBlockForm
        codeBlock={codeBlock}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  )
}

export default CodeBlockFormPage 