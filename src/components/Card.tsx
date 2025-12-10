import { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  borderWidth?: 'bold' | 'heavy'
  shadow?: 'sharp' | 'bold'
  className?: string
  style?: CSSProperties
}

export default function Card({
  children,
  borderWidth = 'heavy',
  shadow = 'bold',
  className = '',
  style = {}
}: CardProps) {
  const borderClasses = {
    bold: 'border-4 border-gray-900',
    heavy: 'border-8 border-gray-900'
  }

  const shadowClasses = {
    sharp: 'shadow-[3px_3px_0px_0px_rgb(13,13,13)]',
    bold: 'shadow-[5px_5px_0px_0px_rgb(13,13,13)]'
  }

  const classes = [
    'bg-white border-solid relative p-6 transition-all duration-200 hover:shadow-[7px_7px_0px_0px_rgb(13,13,13)] hover:-translate-x-[1px] hover:-translate-y-[1px]',
    borderClasses[borderWidth],
    shadowClasses[shadow],
    className
  ].join(' ')

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}
