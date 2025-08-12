import {createRootRouteWithContext, Outlet} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AuthState } from "../types/auth";
interface RouterContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<RouterContext>()({  

    component: RootLayout,
  })

  function RootLayout() {
      
      
    return (
    
    <>
      
      <Outlet />
      {import.meta.env.VITE_APP_ENV === 'dev' && <TanStackRouterDevtools />}
    </>
  )
  }