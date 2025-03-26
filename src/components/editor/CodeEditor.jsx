import { Editor } from '@monaco-editor/react'

const CodeEditor = ({ code, onChange, readOnly = false }) => {
  const handleEditorChange = (value) => {
    onChange(value)
  }

  return (
    <div className="h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyond: false,
          automaticLayout: true
        }}
      />
    </div>
  )
}

export default CodeEditor 