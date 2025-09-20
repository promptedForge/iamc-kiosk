# IAMC Kiosk Style & Aesthetic Guide

## Design Philosophy

The IAMC Kiosk embodies a **"Mission Control"** aesthetic - a sophisticated command center where critical intelligence transforms into actionable insights. Our design language draws from aerospace interfaces, combining military precision with diplomatic elegance.

### Core Principles

1. **Authority Through Restraint** - Every element earns its place
2. **Information Hierarchy** - Critical data surfaces naturally
3. **Cognitive Calm** - Reduce decision fatigue through thoughtful design
4. **Responsive Intelligence** - The interface anticipates and adapts

## Visual Language

### Color Palette

#### Primary Colors
- **Deep Navy** (#0a1929) - The void of strategic thinking
- **Tactical Cyan** (#06b6d4) - Active intelligence, primary actions
- **Alert Purple** (#a855f7) - Hypotheses, creative insights
- **Signal Green** (#10b981) - Confirmation, success states
- **Warning Amber** (#f59e0b) - Attention states, time-sensitive
- **Critical Red** (#ef4444) - High-priority risks, stop actions

#### Neutral Tones
- **Smoke White** (#f3f4f6) - Primary text on dark
- **Steel Gray** (#d1d5db) - Secondary text
- **Muted Gray** (#9ca3af) - Tertiary, disabled states
- **Card Surface** (#0f2236) - Elevated content areas
- **Card Alt** (#11253c) - Interactive hover states

### Typography

#### Font Stack
```
ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Inter', sans-serif
```

#### Type Scale
- **Display**: 2.5rem (40px) - Mission critical headers
- **Title**: 1.875rem (30px) - Section headers
- **Headline**: 1.25rem (20px) - Card titles
- **Body**: 1rem (16px) - Primary content
- **Caption**: 0.875rem (14px) - Supporting text
- **Micro**: 0.75rem (12px) - Labels, timestamps

#### Type Treatment
- **Headers**: Bold (700), tight tracking, 1.2 line height
- **Body**: Regular (400), normal tracking, 1.6 line height
- **Data**: Monospace for numbers, coordinates, IDs
- **Emphasis**: Medium (500) weight, never italic

### Spacing System

Based on 4px grid with purposeful scale:
- `1`: 4px - Micro adjustments
- `2`: 8px - Tight grouping
- `3`: 12px - Element spacing
- `4`: 16px - Section padding
- `6`: 24px - Component margins
- `8`: 32px - Major sections
- `12`: 48px - Page margins

### Elevation & Depth

1. **Background** (z-0): Deep navy base
2. **Content Cards** (z-10): Subtle border glow, 10% opacity borders
3. **Interactive Elements** (z-20): Hover lifts with shadow
4. **Modals/Overlays** (z-30): Backdrop blur, sharp shadows
5. **Critical Alerts** (z-50): Maximum elevation, pulse animation

## Component Design Patterns

### Cards
```
Background: rgba(15, 34, 54, 0.8)
Border: 1px solid rgba(6, 182, 212, 0.15)
Border-radius: 16px
Shadow: 0 10px 30px rgba(0,0,0,0.35)
Backdrop-filter: blur(10px)
```

Cards should feel like **floating intelligence panels** - containing discrete, actionable information.

### Buttons

#### Primary Action
```
Background: Linear gradient (cyan to cyan-dark)
Border: 1px solid primary cyan
Hover: Lift 2px, glow shadow
Active: Depress to original position
```

#### Secondary Action
```
Background: Transparent with border
Border: 1px solid rgba(255,255,255,0.12)
Hover: Subtle background fill
```

#### Danger Action
```
Background: Red with 20% opacity
Border: 1px solid red at 50% opacity
Hover: Full red background
```

### Input Fields
```
Background: Deep card color (#162b44)
Border: 1px solid cyan at 30% opacity
Focus: Cyan border at full opacity, subtle glow
Placeholder: 50% opacity text
```

### Navigation Patterns

#### Thumb Controller
- **Floating orb** with gradient spotlight effect
- **Directional pad** mimics game controller precision
- **Visual feedback** through ring highlights on keypress
- **Contextual hints** appear on hover

#### Command Palette (Cmd+K)
- **Modal overlay** with backdrop blur
- **Sectioned content** for logical grouping
- **Keyboard-first** navigation with visual indicators
- **Auto-save indicator** for configuration changes

### Animation Principles

1. **Purposeful Motion** - Every animation advances understanding
2. **Consistent Timing** - 150ms for micro, 300ms for macro transitions
3. **Ease Functions** - cubic-bezier(0.4, 0, 0.2, 1) for natural movement
4. **Performance First** - Transform and opacity only, no layout shifts

#### Animation Vocabulary
- **Fade In**: New content arrival (500ms)
- **Scale + Fade**: Modal appearances (300ms)
- **Slide**: Panel transitions (300ms)
- **Pulse**: Attention states (2s infinite)
- **Ring Expand**: Selection states (150ms)

## Information Architecture

### Visual Hierarchy

1. **Scannable Headlines** - User knows the topic in 100ms
2. **Progressive Disclosure** - Details on demand
3. **Data Density** - Maximum signal, minimum noise
4. **Contextual Actions** - Tools appear where needed

### Layout Patterns

#### Dashboard Grid
```
12-column grid with 24px gutters
Responsive breakpoints:
- Mobile: Stack to single column
- Tablet: 8 columns, wider gutters
- Desktop: Full 12 columns
- Wide: Max-width 1400px, centered
```

#### Content Prioritization
1. **Critical Intel** - Top left, largest size
2. **Supporting Data** - Right sidebar or below
3. **Actions** - Bottom right, always accessible
4. **Navigation** - Persistent but unobtrusive

## Interaction Patterns

### Feedback States

#### Loading
- Subtle pulse animation on content areas
- Skeleton screens maintain layout
- Progress indicators for known durations

#### Success
- Green confirmation toast, auto-dismiss 3s
- Subtle check animation
- Next action highlighted

#### Error
- Red border highlight on problem area
- Clear error message with recovery action
- Maintain user context and data

### Touch Considerations

For kiosk/tablet modes:
- **48px minimum** touch targets
- **16px padding** around interactive elements
- **Visual feedback** on touch (scale down slightly)
- **Gesture hints** for swipe actions
- **No hover-only** interactions

## Content Guidelines

### Voice & Tone

- **Authoritative** but not authoritarian
- **Clear** without being simplistic  
- **Urgent** when necessary, calm by default
- **Professional** yet approachable

### Microcopy Principles

1. **Action-Oriented** - "Generate Report" not "Report"
2. **Predictive** - Tell users what happens next
3. **Scannable** - Front-load important words
4. **Consistent** - Same action, same label everywhere

### Data Visualization

- **High contrast** ratios for readability
- **Semantic color** usage (red = risk, green = opportunity)
- **Progressive detail** - Overview first, details on interaction
- **Real-time updates** with subtle transitions

## Technical Implementation Notes

### Performance Targets
- First paint under 1s
- Interactive under 3s
- Animations at 60fps
- Touch response under 100ms

### Accessibility Minimums
- WCAG AA contrast ratios
- Keyboard navigation for all features
- Screen reader descriptions
- Focus indicators clearly visible

### Platform Adaptations

#### Desktop
- Hover states fully utilized
- Keyboard shortcuts prominent
- Dense information layouts
- Multi-panel workflows

#### Tablet/Kiosk
- Touch-optimized targets
- Simplified navigation
- Full-screen modes
- Auto-reset timers

#### Mobile
- Single column layouts
- Bottom sheet patterns
- Thumb-reachable actions
- Reduced animation complexity

## Component Checklist

When creating new components, ensure:

- [ ] Follows color palette strictly
- [ ] Respects spacing grid (4px base)
- [ ] Has defined hover, active, focus states
- [ ] Includes loading and error states
- [ ] Works with keyboard navigation
- [ ] Scales for touch interfaces
- [ ] Maintains 60fps animations
- [ ] Has proper elevation/z-index
- [ ] Uses consistent border radius (4px, 8px, 12px, 16px)
- [ ] Includes proper ARIA labels

## The "Feel" Test

Every component should feel:
- **Precise** - Like military-grade equipment
- **Responsive** - Like it's thinking with you
- **Trustworthy** - Like it handles critical data
- **Efficient** - Like every second matters
- **Sophisticated** - Like it belongs in a situation room

## Evolution Principles

As the design system grows:

1. **Consistency Over Novelty** - New patterns must justify their existence
2. **System Thinking** - Components combine predictably
3. **Performance Degradation** - Features scale down gracefully
4. **User Memory** - Patterns remain learnable and memorable
5. **Cultural Sensitivity** - Adapts to global contexts without losing identity

---

*This guide is a living document. As we discover new patterns that enhance the mission control experience, we document them here. The goal is not rigid uniformity, but coherent evolution.*