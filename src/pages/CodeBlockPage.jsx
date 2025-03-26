import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/common/Loading'
import ActionButtons from '../components/code/ActionButtons'
import SessionHeader from '../components/code/SessionHeader'
import HintsPanel from '../components/code/HintsPanel'
import CodeSection from '../components/code/CodeSection'
import { codeBlockApi } from '../server/api'
import socketService from '../services/socketService'
import { debounce } from '../utils/debounce'

const CodeBlockPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [codeBlock, setCodeBlock] = useState(null)
  const [currentCode, setCurrentCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [role, setRole] = useState(null)
  const [isSolutionMatch, setIsSolutionMatch] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [hints, setHints] = useState('')
  const [sessionStatus, setSessionStatus] = useState({
    isActive: false,
    activeUsers: 0,
    mentorConnected: false
  })
 
  // רפרנס לפונקציה מושהית לשליחת שינויי קוד
  const debouncedCodeEmit = useRef(
    debounce((codeBlockId, code) => {
      if (socketService.socket) {
        socketService.socket.emit('code-change', { 
          codeBlockId, 
          code 
        });
      }
    }, 300) // 300ms של השהייה
  ).current;

  // רפרנס לפונקציה מושהית לשליחת שינויי רמזים
  const debouncedHintsEmit = useRef(
    debounce((codeBlockId, hints) => {
      if (socketService.socket) {
        socketService.socket.emit('hints-change', { 
          codeBlockId, 
          hints 
        });
      }
    }, 300) // 300ms של השהייה
  ).current;

  // טיפול בסגירת חלון או רענון דף
  useEffect(() => {
    const handleBeforeUnload = () => {
      // ניתוק מהסשן לפני סגירת הדף
      socketService.leaveCodeBlock(id);
      socketService.disconnect();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [id]);

  useEffect(() => {
    let mounted = true

    //fetch code block
    const fetchCodeBlock = async () => {
      try {
        const data = await codeBlockApi.getById(id)
        if (!mounted) return
        
        setCodeBlock(data)
        

        socketService.connect()
        socketService.joinCodeBlock(id)

        socketService.socket.on('role-assigned', ({ role }) => {
          setRole(role)
        })

        socketService.onHintsUpdate((newHints) => {
          setHints(newHints)
        })

        socketService.onSessionUpdate((status) => {
          setSessionStatus(status)
        })

        socketService.onSessionReset(() => {
          alert('Session ended by mentor');
          navigate('/');
        });

      } catch (err) {
        if (!mounted) return
        setError(err.message)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchCodeBlock()

    return () => {
      mounted = false
      socketService.leaveCodeBlock(id)
      socketService.disconnect()
    }
  }, [id, navigate])

  // פונקציה להסרת הערות וריווחים מהקוד
  const cleanCode = useCallback((code) => {
    let clean = code.replace(/\/\/.*/g, '');
    clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
    clean = clean.replace(/\s+/g, ' ').trim();
    return clean;
  }, []);

  //handle code change
  const handleCodeChange = (newCode) => {
    console.log('Local code change:', newCode);
    setCurrentCode(newCode);
    
    // בדיקה אם הקוד תואם לפתרון (ללא הערות)
    if (codeBlock && cleanCode(newCode) === cleanCode(codeBlock.solutionCode)) {
      setIsSolutionMatch(true);
    } else {
      setIsSolutionMatch(false);
    }

    debouncedCodeEmit(id, newCode);
  }

  // האזנה לשינויי קוד
  useEffect(() => {
    if (!socketService.socket) return;

    const handleCodeUpdate = (newCode) => {
      console.log('Received code change:', newCode);
      setCurrentCode(newCode);
      
      // בדיקה אם הקוד המתקבל תואם לפתרון (ללא הערות)
      if (codeBlock && cleanCode(newCode) === cleanCode(codeBlock.solutionCode)) {
        setIsSolutionMatch(true);
      } else {
        setIsSolutionMatch(false);
      }
    };

    socketService.onCodeChange(handleCodeUpdate);

    return () => {
      if (socketService.socket) {
        socketService.socket.off('code-update');
      }
    };
  }, [codeBlock, cleanCode]);

  // Handle navigation away from the page
  const handleBackToLobby = () => {
    socketService.leaveCodeBlock(id)
    navigate('/')
  }

  if (loading) return <Loading />
  if (error) return <div className="text-red-600 text-center">{error}</div>

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <SessionHeader 
            title={codeBlock.title}
            sessionStatus={sessionStatus}
            role={role}
          />
          <ActionButtons 
            role={role}
            showHints={showHints}
            setShowHints={setShowHints}
            showSolution={showSolution}
            setShowSolution={setShowSolution}
            onLeaveSession={handleBackToLobby}
          />
        </div>

        <HintsPanel 
          role={role}
          hints={hints}
          onHintsChange={(newHints) => {
            setHints(newHints);
            debouncedHintsEmit(id, newHints);
          }}
          show={showHints}
        />

        <CodeSection 
          currentCode={currentCode}
          solutionCode={codeBlock.solutionCode}
          onCodeChange={handleCodeChange}
          showSolution={showSolution}
          isSolutionMatch={isSolutionMatch}
          isReadOnly={showSolution || role === 'mentor'}
        />
      </div>
    </div>
  )
}

export default CodeBlockPage