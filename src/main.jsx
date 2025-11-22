import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/variables.css'
import './styles/globals.css'
import { AuthProvider } from './context/AuthContext.jsx'
import AppRouter from './router/routes.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter /> 
    </AuthProvider>
  </React.StrictMode>
)
