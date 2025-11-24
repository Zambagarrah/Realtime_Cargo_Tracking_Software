import { mockConsignments } from '../data/Data.jsx'

let consignments = [...mockConsignments]

export async function listConsignments() {
  await new Promise(r => setTimeout(r, 300))
  return consignments
}

export async function getConsignmentById(id) {
  await new Promise(r => setTimeout(r, 300))
  return consignments.find(c => c.id === id) || null
}

export async function createConsignment(payload) {
  await new Promise(r => setTimeout(r, 300))
  const newC = {
    ...payload,
    id: `c-${Date.now()}`,
    reference: payload.reference || `REF-${Math.floor(Math.random() * 100000)}`,
    status: payload.status || 'Pending',
    lastUpdated: new Date().toISOString(),
  }
  consignments.push(newC)
  return newC
}

export async function updateConsignment(id, updates) {
  await new Promise(r => setTimeout(r, 300))
  const index = consignments.findIndex(c => c.id === id)
  if (index !== -1) {
    consignments[index] = {
      ...consignments[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    }
    return consignments[index]
  }
  return null
}
export async function deleteConsignment(id) {
  await new Promise(r => setTimeout(r, 300))
  consignments = consignments.filter(c => c.id !== id)
  return { success: true }
}