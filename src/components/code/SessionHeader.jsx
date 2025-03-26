const SessionHeader = ({ title, sessionStatus, role }) => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        {title}
      </h1>
      {sessionStatus && (
        <div className="mt-2 text-sm text-gray-600 flex items-center space-x-4">
          <span>👥 Active Users: {sessionStatus.activeUsers}</span>
          <span>🏷️ Role: {role}</span>
          <span>
            {sessionStatus.isActive 
              ? '🟢 Active' 
              : '🔴 Inactive'}
          </span>
        </div>
      )}
    </div>
  )
}

export default SessionHeader 