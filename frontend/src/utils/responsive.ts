/**
 * Responsive design utilities and hooks
 */

import { useEffect, useState } from 'react'

// Breakpoint definitions matching Tailwind defaults
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Hook to detect current breakpoint
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<keyof typeof breakpoints | 'xs'>('xs')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= breakpoints['2xl']) setBreakpoint('2xl')
      else if (width >= breakpoints.xl) setBreakpoint('xl')
      else if (width >= breakpoints.lg) setBreakpoint('lg')
      else if (width >= breakpoints.md) setBreakpoint('md')
      else if (width >= breakpoints.sm) setBreakpoint('sm')
      else setBreakpoint('xs')
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}

// Hook to check if screen is mobile
export function useIsMobile() {
  const breakpoint = useBreakpoint()
  return breakpoint === 'xs' || breakpoint === 'sm'
}

// Hook to check if screen is tablet
export function useIsTablet() {
  const breakpoint = useBreakpoint()
  return breakpoint === 'md'
}

// Hook to check if screen is desktop
export function useIsDesktop() {
  const breakpoint = useBreakpoint()
  return breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl'
}

// Responsive text size classes
export const responsiveText = {
  // Display text
  display: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  
  // Title text
  title: 'text-xl sm:text-2xl md:text-3xl',
  
  // Headline text
  headline: 'text-lg sm:text-xl md:text-2xl',
  
  // Body text
  body: 'text-sm sm:text-base',
  
  // Caption text
  caption: 'text-xs sm:text-sm',
  
  // Micro text
  micro: 'text-[10px] sm:text-xs',
} as const

// Responsive padding classes
export const responsivePadding = {
  page: 'p-4 sm:p-6 md:p-8',
  section: 'p-3 sm:p-4 md:p-6',
  card: 'p-3 sm:p-4 md:p-5',
  button: 'px-3 py-1.5 sm:px-4 sm:py-2',
  input: 'px-3 py-2 sm:px-4 sm:py-2.5',
} as const

// Responsive gap classes
export const responsiveGap = {
  large: 'gap-4 sm:gap-6 md:gap-8',
  medium: 'gap-3 sm:gap-4 md:gap-6',
  small: 'gap-2 sm:gap-3 md:gap-4',
  tiny: 'gap-1 sm:gap-2',
} as const

// Card title truncation with responsive text
export function getCardTitleClass(isMobile: boolean) {
  return `${responsiveText.headline} font-bold ${
    isMobile ? 'line-clamp-2' : 'line-clamp-1'
  }`
}

// Responsive container widths
export const responsiveWidth = {
  narrow: 'max-w-sm sm:max-w-md md:max-w-lg',
  medium: 'max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl',
  wide: 'max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl',
  full: 'max-w-full',
} as const