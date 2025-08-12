import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './auth.tsx'
import App from './App.tsx'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </StrictMode>,
  )
}