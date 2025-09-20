import { ReactNode } from 'react'
import { useIsMobile, responsiveText, responsivePadding } from '../utils/responsive'

interface ResponsiveCardProps {
  title?: string
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export default function ResponsiveCard({ title, children, className = '', noPadding = false }: ResponsiveCardProps) {
  const isMobile = useIsMobile()

  return (
    <div className={`card ${!noPadding ? responsivePadding.card : ''} ${className}`}>
      {title && (
        <div className={`${responsiveText.headline} font-semibold mb-2 ${isMobile ? 'line-clamp-2' : ''}`}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}