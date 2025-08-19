import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
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
      <div className='flex '>
        <Sidebar/>  
        <div className='px-[48px] py-[24px] flex justify-center w-full h-[calc(100vh-57px)] overflow-scroll'>
          <Outlet/>
        </div>
      </div>
    </>

  )
}
