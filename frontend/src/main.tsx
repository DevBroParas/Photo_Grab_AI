import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './features/auth/context/AuthContext.tsx'
import { Toaster } from 'sonner'
import { LoaderProvider } from './context/LoaderContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <LoaderProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster richColors position='bottom-right' />
    </LoaderProvider>
  </StrictMode>,
)
