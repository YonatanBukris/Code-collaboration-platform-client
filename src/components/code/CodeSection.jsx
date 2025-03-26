import CodeEditor from '../editor/CodeEditor'

const CodeSection = ({ 
  currentCode, 
  solutionCode, 
  onCodeChange, 
  showSolution, 
  isSolutionMatch,
  isReadOnly
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          Your Code
          {isSolutionMatch && (
            <span className="ml-2 text-2xl">🎉</span>
          )}
        </h2>
        <CodeEditor
          code={currentCode}
          onChange={onCodeChange}
          readOnly={isReadOnly}
        />
      </div>

      {showSolution && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Solution</h2>
          <CodeEditor
            code={solutionCode}
            readOnly={true}
          />
        </div>
      )}
    </div>
  )
}

export default CodeSection 