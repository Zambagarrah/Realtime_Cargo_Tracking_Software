// src/services/userService.js
const users = [
  { id: 'u-1', name: 'Admin', email: 'admin@example.com', role: 'admin' },
  { id: 'u-2', name: 'Operator', email: 'user@example.com', role: 'user' },
]

export async function listUsers() {
  await new Promise(r => setTimeout(r, 400))
  return users
}

export async function createUser(payload) {
  await new Promise(r => setTimeout(r, 400))
  const u = { id: `u-${Math.floor(Math.random() * 100000)}`, ...payload }
  users.push(u)
  return u
}

export async function updateUser(id, updates) {
  await new Promise(r => setTimeout(r, 400))
  const idx = users.findIndex(u => u.id === id)
  if (idx >= 0) {
    users[idx] = { ...users[idx], ...updates }
    return users[idx]
  }
  return null
}

export async function deleteUser(id) {
  await new Promise(r => setTimeout(r, 400))
  const idx = users.findIndex(u => u.id === id)
  if (idx >= 0) {
    users.splice(idx, 1)
    return { success: true }
  }
  return { success: false }
}
