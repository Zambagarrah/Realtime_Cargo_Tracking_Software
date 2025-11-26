import { mockUsers } from '../data/Data.jsx'

let users = [...mockUsers]

export async function listUsers() {
  await new Promise(r => setTimeout(r, 300))
  return users
}

export async function createUser(payload) {
  await new Promise(r => setTimeout(r, 300))
  const newUser = { id: `u-${Date.now()}`, ...payload }
  users.push(newUser)
  return newUser
}

export async function updateUser(id, updates) {
  await new Promise(r => setTimeout(r, 300))
  const index = users.findIndex(u => u.id === id)
  if (index !== -1) {
    users[index] = { ...users[index], ...updates }
    return users[index]
  }
  return null
}

export async function deleteUser(id) {
  await new Promise(r => setTimeout(r, 300))
  users = users.filter(u => u.id !== id)
  return { success: true }
}
