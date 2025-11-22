// src/router/routes.jsx
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import ConsignmentDetail from '../pages/ConsignmentDetail.jsx'
import ConsignmentForm from '../pages/ConsignmentForm.jsx'
import RealtimeTracking from '../pages/RealtimeTracking.jsx'
import AdminPanel from '../pages/AdminPanel.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },

      {
        element: <ProtectedRoute roles={['user', 'admin']} />,
        children: [
          { path: 'consignments/new', element: <ConsignmentForm /> },
          { path: 'consignments/:id', element: <ConsignmentDetail /> },
          { path: 'realtime', element: <RealtimeTracking /> },
        ],
      },
      {
        element: <ProtectedRoute roles={['admin']} />,
        children: [
          { path: 'admin', element: <AdminPanel /> },
        ],
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
