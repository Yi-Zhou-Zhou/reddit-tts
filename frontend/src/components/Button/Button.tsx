import React from 'react'

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text:string,
  fullWidth? : boolean,
}
const Button = ({text, fullWidth = false, ...props} : ButtonType) => {
  return (
    <button {...props} className={`${fullWidth ? 'w-full' : 'w-inherit'} border rounded-md p-1 hover:opacity-50 hover:cursor-pointer`}>{text}</button>
  )
}

export default Button