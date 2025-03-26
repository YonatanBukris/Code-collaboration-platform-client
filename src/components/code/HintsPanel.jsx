const HintsPanel = ({ role, hints, onHintsChange, show }) => {
  if (!show) return null;

  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">
        {role === 'mentor' ? 'Write Hints' : 'Hints'}
      </h2>
      {role === 'mentor' ? (
        <textarea
          value={hints}
          onChange={(e) => onHintsChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write hints for students here..."
        />
      ) : (
        <div className="bg-white p-4 rounded-md border border-gray-200 min-h-[8rem]">
          {hints || 'No hints yet...'}
        </div>
      )}
    </div>
  )
}

export default HintsPanel 