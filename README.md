# Code Collaboration Platform

A real-time code collaboration platform where mentors can create coding exercises and students can solve them with live guidance.

## Features

- Real-time code collaboration
- Live code execution
- Mentor-student interaction
- Multiple coding exercises
- Solution validation
- Hints system

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Real-time Communication: Socket.IO
- Code Editor: Monaco Editor

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_uri
CLIENT_URL=http://localhost:5173
```

4. Start the development servers:

```bash
# Start the server (from server directory)
npm run dev

# Start the client (from client directory)
npm run dev
```

## Usage

1. Access the application at `http://localhost:5173`
   - Create new coding exercises
   - Monitor student progress
   - Provide real-time guidance
2. As a student:
   - Select exercises to solve
   - Get real-time feedback
   - Submit solutions
