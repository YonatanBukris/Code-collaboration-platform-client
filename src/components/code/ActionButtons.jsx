import Button from '../common/Button'

const ActionButtons = ({ 
  role, 
  showHints, 
  setShowHints, 
  showSolution, 
  setShowSolution, 
  onLeaveSession 
}) => {
  return (
    <div className="flex items-center space-x-4">
      {role === 'mentor' ? (
        <Button
          onClick={() => setShowHints(!showHints)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          {showHints ? 'Hide Hints Editor' : 'Write Hints'}
        </Button>
      ) : (
        <Button
          onClick={() => setShowHints(!showHints)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          {showHints ? 'Hide Hints' : 'Show Hints'}
        </Button>
      )}
      
      <Button
        onClick={() => setShowSolution(!showSolution)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        {showSolution ? 'Hide Solution' : 'Show Solution'}
      </Button>

      <Button
        onClick={onLeaveSession}
        className="px-4 py-2 bg-gray-600 text-black rounded-md hover:bg-gray-300 transition-colors"
      >
        Leave session
      </Button>
    </div>
  )
}

export default ActionButtons 