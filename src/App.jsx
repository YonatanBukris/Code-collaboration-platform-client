import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LobbyPage from './pages/LobbyPage'
import CodeBlockPage from './pages/CodeBlockPage'
import CodeBlockFormPage from './pages/CodeBlockFormPage'
import Header from './components/layout/Header'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<LobbyPage />} />
            <Route path="/code-block/:id" element={<CodeBlockPage />} />
            <Route path="/code-block/new" element={<CodeBlockFormPage />} />
            <Route path="/code-block/:id/edit" element={<CodeBlockFormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
