/**
 * Touch device detection and utilities
 */

export function isTouchDevice(): boolean {
  return (
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    ((navigator as any).msMaxTouchPoints > 0)
  )
}

export function hasCoarsePointer(): boolean {
  return window.matchMedia('(pointer: coarse)').matches
}

export function hasFinePointer(): boolean {
  return window.matchMedia('(pointer: fine)').matches
}

export function applyTouchModeClasses(enableTouchMode: boolean): void {
  const isTouch = isTouchDevice()
  const hasCoarse = hasCoarsePointer()
  
  if ((isTouch || hasCoarse) && enableTouchMode) {
    document.body.classList.add('touch-mode')
    document.documentElement.style.setProperty('--min-touch-target', '48px')
  } else {
    document.body.classList.remove('touch-mode')
    document.documentElement.style.setProperty('--min-touch-target', '32px')
  }
}

export function initializeTouchListeners(): void {
  let touchTimeout: NodeJS.Timeout
  
  // Add touch feedback
  document.addEventListener('touchstart', (e) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('btn') || target.classList.contains('clickable-card')) {
      target.classList.add('touch-active')
      
      touchTimeout = setTimeout(() => {
        target.classList.remove('touch-active')
      }, 300)
    }
  })
  
  document.addEventListener('touchend', () => {
    clearTimeout(touchTimeout)
    document.querySelectorAll('.touch-active').forEach(el => {
      el.classList.remove('touch-active')
    })
  })
}