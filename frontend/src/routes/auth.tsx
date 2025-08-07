import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Input from '../components/Input'
export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const [type, setType] = useState('login')
  return <div className='w-screen h-screen bg-[#131736] flex items-center justify-center'>
    <section className='rounded-xl bg-white max-w-[90vw] max-h-[90vh] w-[350px] h-[400px] p-8'>
        <h1 className='text-center bold text-[24px] mb-4'>{type === 'login' ? 'Log In' : 'Register'}</h1>
        <p className='mb-6'>Rellena las credenciales de abajo para validar tu proceso de validación</p>
        <div className='input-container flex flex-col gap-6'>
        <Input fullWidth={true} name={"Email"}/>
        <Input fullWidth={true} name={"Contraseña"} type='password' />
        </div>
        
    </section>
  </div>
}
