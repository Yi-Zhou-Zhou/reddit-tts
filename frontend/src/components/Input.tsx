import React from 'react'
import './input.css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    fullWidth?: boolean,
}

const Input = ({name, fullWidth = false, ...props}: InputProps) => {
    console.log(fullWidth)
  return (
    <div className='relative input-container'>
    <input name={name} type="text" required  className={`${fullWidth ? 'w-full' : 'w-[200px]'} border rounded-xl p-2 h-[48px]`} {...props}/>
    <label  htmlFor={name} className='absolute pointer-events-none select-none '>{name}</label>
    </div>
  )
}

export default Input
