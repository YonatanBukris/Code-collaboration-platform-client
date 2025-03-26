import axios from 'axios'
const API_URL = 'http://localhost:5000/api'
export const codeBlockApi = {
  // Get all code blocks
  getAll: async () => {
    const response = await axios.get(`${API_URL}/codeblocks`)
    return response.data
  },
  // Get a single code block by ID
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/codeblocks/${id}`)
    return response.data
  },
  // Create a new code block
  create: async (codeBlock) => {
    const response = await axios.post(`${API_URL}/codeblocks`, codeBlock)
    return response.data
  },
  // Update a code block
  update: async (id, codeBlock) => {
    const response = await axios.put(`${API_URL}/codeblocks/${id}`, codeBlock)
    return response.data
  },
  // Delete a code block
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/codeblocks/${id}`)
    return response.data
  }
}