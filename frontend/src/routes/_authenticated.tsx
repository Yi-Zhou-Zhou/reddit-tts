import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Navbar from '../components/Navbar/Navbar'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context, location}) => {
    if(!context.auth.isAuthenticated){
      // Try to fetch the token again
      try {
        await context.auth.fetchMe()
      } catch {
        throw redirect({to: '/auth', search: { redirect: location.href}})
        
      }
    } 
  },
  component: ProtectedRoute
})

function ProtectedRoute(){
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>

  )
}
