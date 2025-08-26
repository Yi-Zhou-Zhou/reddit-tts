import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './auth.tsx'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  const queryClient = new QueryClient()
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App/>
      </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}