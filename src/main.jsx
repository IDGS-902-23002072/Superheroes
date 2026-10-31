import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import ReactDOM from 'react-dom/client' 
import React from "react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      
    <App />

    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
