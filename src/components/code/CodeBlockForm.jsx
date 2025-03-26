import { useState } from 'react'
import CodeEditor from '../editor/CodeEditor'

const CodeBlockForm = ({ codeBlock, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(codeBlock?.title || '')
  const [initialCode, setInitialCode] = useState(codeBlock?.initialCode || '')
  const [solutionCode, setSolutionCode] = useState(codeBlock?.solutionCode || '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    if (!initialCode.trim()) {
      setError('Initial code is required')
      return
    }

    if (!solutionCode.trim()) {
      setError('Solution code is required')
      return
    }

    onSubmit({
      title: title.trim(),
      initialCode: initialCode.trim(),
      solutionCode: solutionCode.trim()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter code block title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Initial Code
        </label>
        <CodeEditor
          code={initialCode}
          onChange={setInitialCode}
          readOnly={false}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Solution Code
        </label>
        <CodeEditor
          code={solutionCode}
          onChange={setSolutionCode}
          readOnly={false}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {codeBlock ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default CodeBlockForm 