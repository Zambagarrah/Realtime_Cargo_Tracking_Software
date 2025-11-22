// src/services/authService.js
export async function login(email, password) {
  // Stub: In reality, POST /auth/login
  await new Promise(r => setTimeout(r, 500))
  // Simple role rule: admin if email contains 'admin'
  const role = email.includes('admin') ? 'admin' : 'user'
  const token = 'stubbed.jwt.token' // replace with real token from backend
  const user = { id: 'u-123', name: 'Zablon', email, role }
  return { token, user }
}

export async function register(payload) {
  await new Promise(r => setTimeout(r, 500))
  return { success: true }
}
