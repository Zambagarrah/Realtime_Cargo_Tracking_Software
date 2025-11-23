// src/data/Data.jsx

export const mockUsers = [
  {
    id: 'u-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: 'u-2',
    name: 'Logistics Officer',
    email: 'user@example.com',
    role: 'user',
  },
]

export const mockConsignments = [
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
  {
    id: 'c-1002',
    reference: 'REF-1002',
    senderName: 'Gamma Exports',
    senderPhone: '+254701555666',
    receiverName: 'Delta Imports',
    receiverPhone: '+254702777888',
    origin: 'Kisumu',
    destination: 'Eldoret',
    cargoType: 'Machinery',
    weightKg: 8000,
    status: 'Delivered',
    currentLocation: { lat: 0.5167, lng: 35.2833 },
    lastUpdated: new Date().toISOString(),
    notes: '',
  },
]
export const mockStatuses = ['Pending', 'In Transit', 'Delivered', 'Delayed', 'Cancelled']