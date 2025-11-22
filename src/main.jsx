// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// import variables. and global.css
import './styles/variables.css'
import './styles/globals.css'
import { AuthProvider } from './context/AuthContext.jsx'
import "bootstrap/dist/css/bootstrap.min.css"; // <--Bootsrap CSS
import "bootstrap/dist/js/bootstrap.bundles.min.js"; // <--optional JS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
