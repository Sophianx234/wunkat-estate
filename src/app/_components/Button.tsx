import { ButtonHTMLAttributes, ReactNode } from "react"

type buttonProps = {
  handleBtn?:()=>void
  children: ReactNode
  
} & ButtonHTMLAttributes<HTMLButtonElement>
function Button({children,handleBtn,...rest}:buttonProps) {
  return (
    <button onClick={handleBtn} {...rest}>
      {children}
    </button>
  )
}

export default Button
