import { RouterProvider, createRouter} from '@tanstack/react-router'
import { useAuth } from './auth';
import { routeTree } from './routeTree.gen';

const router = createRouter({routeTree, context: undefined!})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
export default function App(){
  
    const auth = useAuth();
    
    return (
      <RouterProvider router={router} context={{auth}}/>
    )
  
  }

