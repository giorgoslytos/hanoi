import React, { ReactNode } from 'react'

interface ButtonIconProps {
  onClick?: () => void
  className?: string
  children: ReactNode
  color?: string
  hoverColor?: string
  size?: number
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onClick,
  className = '',
  children,
  color = 'text-teal-600',
  hoverColor = 'text-teal-400',
  size = 6, // Tailwind size (6 = 24px)
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        p-1 rounded-full 
        transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-teal-200
        ${color} hover:${hoverColor}
        ${className}
        `}
      aria-label="Icon button"
    >
      <div className={`w-${size} h-${size}`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child as React.ReactElement<{ className?: string }>,
              {
                className: `w-full h-full ${(child.props as ButtonIconProps)?.className || ''}`,
              },
            )
          }
          return child
        })}
      </div>
    </button>
  )
}

export default ButtonIcon
