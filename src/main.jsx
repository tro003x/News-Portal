import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/route.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import { LoadingProvider } from './contexts/LoadingProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <RouterProvider
          router={router}
          fallbackElement={<div className="p-4 text-center">Loading…</div>}
          hydrateFallbackElement={<div className="p-4 text-center">Loading…</div>}
        />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </AuthProvider>
    </LoadingProvider>

  </StrictMode>, 
)
