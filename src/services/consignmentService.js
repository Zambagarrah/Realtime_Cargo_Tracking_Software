// src/services/consignmentService.js
// Recommended consignment model:
// { id, reference, senderName, senderPhone, receiverName, receiverPhone,
//   origin, destination, cargoType, weightKg, status, currentLocation: { lat, lng },
//   lastUpdated, notes }

const mockConsignments = [
  {
    id: 'c-1001',
    reference: 'REF-1001',
    senderName: 'Alpha Ltd',
    senderPhone: '+254700111222',
    receiverName: 'Beta Traders',
    receiverPhone: '+254700333444',
    origin: 'Mombasa',
    destination: 'Nairobi',
    cargoType: 'Containers',
    weightKg: 12000,
    status: 'In Transit',
    currentLocation: { lat: -4.0435, lng: 39.6682 },
    lastUpdated: new Date().toISOString(),
    notes: 'Handle with care',
  },
]

export async function listConsignments() {
  await new Promise(r => setTimeout(r, 400))
  return mockConsignments
}

export async function getConsignmentById(id) {
  await new Promise(r => setTimeout(r, 300))
  return mockConsignments.find(c => c.id === id) || null
}

export async function createConsignment(payload) {
  await new Promise(r => setTimeout(r, 500))
  const newC = {
    ...payload,
    id: `c-${Math.floor(Math.random() * 100000)}`,
    reference: payload.reference || `REF-${Math.floor(Math.random() * 100000)}`,
    status: payload.status || 'Pending',
    lastUpdated: new Date().toISOString(),
  }
  mockConsignments.push(newC)
  return newC
}

export async function updateConsignment(id, updates) {
  await new Promise(r => setTimeout(r, 500))
  const idx = mockConsignments.findIndex(c => c.id === id)
  if (idx >= 0) {
    mockConsignments[idx] = { ...mockConsignments[idx], ...updates, lastUpdated: new Date().toISOString() }
    return mockConsignments[idx]
  }
  return null
}
