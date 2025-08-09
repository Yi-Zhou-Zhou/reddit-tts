import React from 'react'
import './input.css'
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    fullWidth?: boolean,
    errors?: Record<string,string>
}

const Input = ({name, fullWidth = false, errors={}, ...props}: InputProps) => {
  return (
    <div className='relative input-container'>
    <input name={name} type="text" required  className={`${fullWidth ? 'w-full' : 'w-[200px]'} border rounded-xl p-2 h-[48px] ${name in errors && errors[name] ? 'invalid' : ""}`} {...props}/>
    <label  htmlFor={name} className={`absolute pointer-events-none select-none ${name in errors && errors[name] ? 'invalid' : ""}`}>{name}</label>
    <p className='text-[#e80f00]'>{name in errors && errors[name] ? errors[name] : ''}</p>
    </div>
  )
}

export default Input
