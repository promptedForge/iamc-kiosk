import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../store'

interface DemoStep {
  route: string
  duration: number
  actions?: () => void
  description: string
}

export default function DemoWalkthrough() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const { setUserRole, reset } = useStore()

  // Define all demo steps
  const demoSteps: DemoStep[] = [
    {
      route: '/',
      duration: 3000,
      actions: undefined, // Don't call reset here, it's already done in startDemo
      description: 'Welcome screen'
    },
    {
      route: '/',
      duration: 4000,
      actions: () => {
        // Auto-select Media Team role
        setTimeout(() => setUserRole('Media Team'), 1000)
        setTimeout(() => navigate('/radar'), 2500)
      },
      description: 'Select Media Team role'
    },
    {
      route: '/radar',
      duration: 8000,
      actions: () => {
        // Expand processing feed after 2 seconds
        setTimeout(() => {
          const feedHeader = document.querySelector('[class*="cursor-pointer"][class*="hover:bg-cyan"]')
          if (feedHeader) (feedHeader as HTMLElement).click()
        }, 2000)
        
        // Collapse it after 5 seconds
        setTimeout(() => {
          const feedHeader = document.querySelector('[class*="cursor-pointer"][class*="hover:bg-cyan"]')
          if (feedHeader) (feedHeader as HTMLElement).click()
        }, 5000)
      },
      description: 'Intelligence dashboard & processing feed'
    },
    {
      route: '/radar',
      duration: 5000,
      actions: () => {
        // Click on first high priority issue
        setTimeout(() => {
          const issues = document.querySelectorAll('[class*="hover:scale"]')
          if (issues[0]) (issues[0] as HTMLElement).click()
        }, 1000)
      },
      description: 'Navigate to issue details'
    },
    {
      route: '/issue/farmers-20250919',
      duration: 6000,
      actions: () => {
        // Switch between lenses
        setTimeout(() => {
          const ceoBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent === 'CEO')
          if (ceoBtn) ceoBtn.click()
        }, 1000)
        
        setTimeout(() => {
          const cooBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent === 'COO')
          if (cooBtn) cooBtn.click()
        }, 2500)
        
        // Scroll down to show assets section
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' })
        }, 4000)
      },
      description: 'View brief & switch perspectives'
    },
    {
      route: '/issue/farmers-20250919',
      duration: 5000,
      actions: () => {
        // Click generate assets
        setTimeout(() => {
          const generateBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent === 'Generate')
          if (generateBtn) generateBtn.click()
        }, 1000)
        
        // Navigate to ROI
        setTimeout(() => navigate('/roi'), 3500)
      },
      description: 'Generate communication assets'
    },
    {
      route: '/roi',
      duration: 5000,
      actions: () => {
        // Scroll to show full content
        setTimeout(() => {
          window.scrollTo({ top: 200, behavior: 'smooth' })
        }, 1500)
        
        // Navigate to export
        setTimeout(() => navigate('/export/latest'), 3500)
      },
      description: 'ROI analysis & metrics'
    },
    {
      route: '/export/latest',
      duration: 6000,
      actions: () => {
        // Switch to Strategy Head
        setTimeout(() => {
          setUserRole('Strategy Head')
          navigate('/radar')
        }, 2000)
        
        // Show signoff flow
        setTimeout(() => {
          const signoffSection = document.querySelector('[class*="Strategy Head signoff"]')
          if (signoffSection) {
            signoffSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 3500)
      },
      description: 'Export with dual signoff'
    },
    {
      route: '/radar',
      duration: 4000,
      actions: () => {
        // Navigate to tweaks
        setTimeout(() => navigate('/tweaks'), 2000)
      },
      description: 'Strategy Head view'
    },
    {
      route: '/tweaks',
      duration: 4000,
      actions: () => {
        // Scroll to show content
        setTimeout(() => {
          window.scrollTo({ top: 200, behavior: 'smooth' })
        }, 1500)
      },
      description: 'Learning loop & feedback'
    }
  ]

  const stopDemo = useCallback(() => {
    setIsRunning(false)
    setCurrentStep(0)
    setProgress(0)
    // Defer reset to avoid state update during render
    setTimeout(() => {
      reset()
      navigate('/')
    }, 0)
  }, [navigate, reset])

  // Run demo steps
  useEffect(() => {
    if (!isRunning || currentStep >= demoSteps.length) {
      if (currentStep >= demoSteps.length) {
        // Demo complete, restart
        setTimeout(() => {
          setCurrentStep(0)
          navigate('/')
        }, 1000)
      }
      return
    }

    const step = demoSteps[currentStep]
    
    // Execute step actions
    if (step.actions) {
      step.actions()
    }

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / (step.duration / 100)), 100))
    }, 100)

    // Move to next step
    const stepTimer = setTimeout(() => {
      setProgress(0)
      setCurrentStep(prev => prev + 1)
    }, step.duration)

    return () => {
      clearTimeout(stepTimer)
      clearInterval(progressInterval)
    }
  }, [isRunning, currentStep, demoSteps, navigate])

  // Start demo function
  const startDemo = () => {
    // Defer all state updates to avoid React error
    setTimeout(() => {
      reset()
      setIsRunning(true)
      setCurrentStep(0)
      setProgress(0)
      navigate('/')
    }, 0)
  }

  return (
    <>
      {/* Demo trigger button */}
      {!isRunning && location.pathname === '/' && (
        <button
          onClick={startDemo}
          className="fixed top-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Loop Demo
          </span>
        </button>
      )}

      {/* Demo overlay */}
      {isRunning && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-100"
              style={{ width: `${(currentStep / demoSteps.length) * 100}%` }}
            />
          </div>

          {/* Step progress */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-white">
                {demoSteps[currentStep]?.description || 'Demo Complete'}
              </div>
              <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <button
                onClick={stopDemo}
                className="pointer-events-auto text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Step indicator dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {demoSteps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentStep 
                    ? 'bg-white w-6' 
                    : idx < currentStep 
                    ? 'bg-white/60' 
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}