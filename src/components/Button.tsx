import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'minimal'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-bold uppercase tracking-wider transition-all duration-[0.15s] ease-out cursor-pointer border-4 border-gray-900 shadow-[5px_5px_0px_0px_rgb(13,13,13)] active:shadow-[1px_1px_0px_0px_rgb(13,13,13)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-[5px_5px_0px_0px_rgb(13,13,13)] focus:outline-none'

  const variantClasses = {
    primary: 'bg-red-500 text-white hover:shadow-[7px_7px_0px_0px_rgb(13,13,13)] hover:translate-x-[-2px] hover:translate-y-[-2px] focus:bg-orange-600 hover:bg-orange-600',
    secondary: 'bg-white text-gray-900 hover:bg-gray-100 focus:bg-gray-200 border-orange-500',
    minimal: 'bg-transparent border-0 shadow-none hover:bg-gray-100 text-gray-900 px-4 py-2 focus:bg-gray-200'
  }

  const sizeClasses = {
    small: 'px-4 py-2 text-sm min-h-[44px]',
    medium: 'px-6 py-3 text-lg min-h-[52px]',
    large: 'px-8 py-4 text-2xl min-h-[64px]'
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    'disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[5px_5px_0px_0px_rgb(13,13,13)]',
    className
  ].join(' ')

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
