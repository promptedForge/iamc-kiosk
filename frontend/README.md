# Frontend - Kiosk/Demo Track

This is the rapid prototyping track focused on creating compelling demonstrations within strict time constraints. This track prioritizes visual impact and user experience over architectural perfection.

## 🎯 Track Philosophy

The kiosk track operates under the principle: **"Ship fast, impress stakeholders, iterate quickly."**

### Core Constraints
- ⏱️ **Maximum 2-week sprints** for any feature
- 🚫 **No production dependencies** (Redux, GraphQL, etc.)
- ✅ **Mockable everything** - All data can be static/mocked
- 🎨 **Visual polish over code perfection**
- 📱 **Desktop-first** (mobile can be skipped)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── routes/          # Page components (App router)
│   │   ├── App.tsx      # Main layout with keyboard shortcuts
│   │   ├── Framing.tsx  # Landing page with role selection
│   │   ├── Radar.tsx    # Issue classification dashboard
│   │   ├── Issue.tsx    # Detailed issue view
│   │   ├── ROI.tsx      # Impact metrics
│   │   └── Export.tsx   # Export functionality
│   ├── components/      # Reusable UI components
│   │   ├── ReviewBar.tsx    # Sign-off status bar
│   │   └── Palette.tsx      # Command palette (Cmd+K)
│   ├── store.ts         # Zustand global state
│   └── index.css        # Tailwind + custom styles
├── public/              # Static assets
└── Dockerfile          # Container configuration
```

## 💡 Key Features Implementation

### Role-Based Access
```typescript
// Simple role storage in Zustand
const { userRole, setUserRole } = useStore()

// Filter content based on role
const items = data.filter(item => 
  item.visibility.includes(userRole)
)
```

### Real-time Data Simulation
```typescript
// Mock real-time updates - no WebSocket needed!
useEffect(() => {
  const interval = setInterval(() => {
    setUpdates(prev => [...prev, randomUpdate])
  }, 4000)
  return () => clearInterval(interval)
}, [])
```

### Quick Styling Patterns
```jsx
// Use Tailwind classes directly - no CSS modules
<div className="card p-4 animate-fade-in">
  <h2 className="text-2xl font-bold">Title</h2>
</div>

// Custom glass morphism effect
className="bg-black/40 backdrop-blur"
```

## 🎨 Design System

### Color Palette
- **Background**: `#0a1628` (navy)
- **Cards**: `#0f2236` with `rgba(255,255,255,0.06)` border
- **Buttons**: `#162b44` hover: `#1b334f`
- **Accent**: `#7DD3FC` (sky blue)
- **Critical**: `text-red-400`
- **Warning**: `text-orange-400`

### Component Patterns
```jsx
// Glass card
<div className="card p-6">...</div>

// Interactive button
<button className="btn">Click me</button>

// Status indicator
<span className="text-green-400 animate-pulse">●</span>
```

## 🔧 Development Guidelines

### Do's ✅
- Hard-code data when faster
- Use inline styles for one-offs
- Mock API responses with static JSON
- Prioritize animations and transitions
- Ship partial features that look complete

### Don'ts ❌
- Don't over-engineer state management
- Don't write comprehensive tests
- Don't optimize performance prematurely
- Don't implement full error handling
- Don't worry about accessibility (unless required)

## 🚢 Rapid Development Patterns

### 1. Static Data First
```typescript
// Start with hard-coded data
const MOCK_ISSUES = [
  { id: 1, title: "Labor violation", priority: "high" },
  // ... more mock data
]

// Later, add API call if time permits
const { data = MOCK_ISSUES } = useQuery(...)
```

### 2. UI-First Development
1. Create static HTML/CSS mockup
2. Add interactivity with React
3. Connect to mock data
4. Polish animations
5. Ship it!

### 3. Time-Saving Shortcuts
```typescript
// One-line conditionals
const color = priority === 'high' ? 'red' : 'gray'

// Inline event handlers for simple actions
onClick={() => navigate('/next')}

// Direct DOM when needed
document.documentElement.requestFullscreen()
```

## 📱 Responsive Design

Focus on desktop (1920x1080) first. Mobile is optional:

```css
/* Desktop-first approach */
.grid-cols-2  /* Default: 2 columns */
.md:grid-cols-3  /* Only add if time permits */
```

## 🎭 Demo Mode Features

### Auto-advance
```typescript
// Automatically progress through screens
useEffect(() => {
  const timer = setTimeout(() => nav('/next'), 3000)
  return () => clearTimeout(timer)
}, [])
```

### Keyboard Navigation
- **Space** - Next screen
- **B** - Back
- **F** - Fullscreen
- **R** - Reset demo

## 🐛 Common Issues & Quick Fixes

### Issue: State not persisting
```typescript
// Quick fix: Use sessionStorage
sessionStorage.setItem('userRole', role)
const savedRole = sessionStorage.getItem('userRole')
```

### Issue: Animation jank
```css
/* Add will-change for smooth animations */
.animate-fade-in {
  will-change: opacity, transform;
}
```

### Issue: Build fails
```bash
# Quick fix: Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## 📦 Deployment

### Docker (Recommended)
```bash
docker build -t kiosk-demo .
docker run -p 5173:5173 kiosk-demo
```

### Static Hosting
```bash
npm run build
# Upload dist/ folder to any static host
```

## 🎯 Success Metrics

Your demo is successful if:
- ✅ Loads in under 2 seconds
- ✅ Animations are smooth (60fps)
- ✅ Stakeholders say "Wow!"
- ✅ Core flow works without errors
- ✅ Looks professional and polished

## 🚨 Red Flags to Avoid

- 🚫 Spending >2 days on any single feature
- 🚫 Refactoring working code
- 🚫 Writing unit tests
- 🚫 Implementing complex state management
- 🚫 Waiting for "perfect" designs

## 💬 Tips from the Field

> "If it looks good and demos well, ship it. Perfect code can wait." - Kiosk Track Lead

> "Animation sells features better than architecture diagrams." - UX Designer

> "Mock data is your friend. Real APIs are tomorrow's problem." - Demo Engineer

---

Remember: This track is about **speed and impact**, not perfection. When in doubt, choose the path that gets you to a working demo fastest!