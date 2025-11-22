import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom'

import App from '../App.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import ConsignmentDetail from '../pages/ConsignmentDetail.jsx'
import ConsignmentForm from '../pages/ConsignmentForm.jsx'
import RealtimeTracking from '../pages/RealtimeTracking.jsx'
import AdminPanel from '../pages/AdminPanel.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes */}
      <Route index element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Protected routes for authenticated users */}
      <Route element={<ProtectedRoute roles={['user', 'admin']} />}>
        <Route path="consignments/new" element={<ConsignmentForm />} />
        <Route path="consignments/:id" element={<ConsignmentDetail />} />
        <Route path="realtime" element={<RealtimeTracking />} />
      </Route>

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="admin" element={<AdminPanel />} />
      </Route>
    </Route>
  )
)

export default function AppRouter() {
  return <RouterProvider router={router} />
}
