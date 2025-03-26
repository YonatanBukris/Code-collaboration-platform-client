import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'

class SocketService {
  constructor() {
    this.socket = null
  }

  connect() {
    this.socket = io(SOCKET_URL, {
      withCredentials: true
    })
    
    this.socket.on('connect', () => {
      console.log('Connected to socket server')
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server')
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // Join a code block room
  joinCodeBlock(codeBlockId) {
    if (this.socket) {
      this.socket.emit('join-code-block', codeBlockId)
    }
  }

  // Leave a code block room
  leaveCodeBlock(codeBlockId) {
    if (this.socket) {
      this.socket.emit('leave-code-block', codeBlockId)
    }
  }

  // Listen for code changes
  onCodeChange(callback) {
    if (this.socket) {
      this.socket.on('code-update', callback);
    }
  }   

  sendHints(codeBlockId, hints) {
    if (this.socket) {
      this.socket.emit('hints-change', { codeBlockId, hints });
    }
  }

  // האזנה לעדכוני רמזים
  onHintsUpdate(callback) {
    if (this.socket) {
      this.socket.on('hints-update', callback);
    }
  }

  // האזנה לעדכוני סשן
  onSessionUpdate(callback) {
    if (this.socket) {
      this.socket.on('session-update', callback);
    }
  }

  // האזנה להקצאת תפקיד
  onRoleAssigned(callback) {
    if (this.socket) {
      this.socket.on('role-assigned', callback);
    }
  }

  // האזנה לאיפוס סשן
  onSessionReset(callback) {
    if (this.socket) {
      this.socket.on('session-reset', () => {
        // ניתוק מהסוקט
        this.disconnect();
        
        // הפעלת הקאלבק שיעביר לדף הבית
        if (callback) {
          callback();
        }
      });
    }
  }
}

export default new SocketService()