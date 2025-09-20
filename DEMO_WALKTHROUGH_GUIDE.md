# IAMC Kiosk Demo Walkthrough Guide

This document provides a comprehensive, element-by-element description of the automated demo walkthrough for the IAMC (Intelligence Analysis & Media Coordination) prototype kiosk. The demo runs for approximately 90 seconds, showcasing how the platform transforms noise into actionable intelligence in 5 minutes.

## Demo Flow Overview

The demo consists of 9 steps with a total duration of approximately 50 seconds (excluding transitions). Each step demonstrates specific functionality and user interactions.

## Screen 1: Welcome/Landing Screen (3 seconds)

**Route:** `/` (Framing component)  
**Duration:** 3 seconds  
**Purpose:** Initial landing page introducing the platform's value proposition

### Visible Elements:
- **Main Heading:** "From Noise → Clarity in 5 Minutes" (large, bold, centered)
- **Subheading:** "What your team wakes up to daily." (smaller, below main heading)
- **Background:** Gradient from navy to steel blue
- **Bottom Controls:** Reset button (R) and ⌘K button in bottom left corner

### Automatic Interactions:
- After 1.5 seconds, login options begin to fade in

## Screen 2: Role Selection (4 seconds)

**Route:** `/` (Framing component)  
**Duration:** 4 seconds  
**Purpose:** User role selection to demonstrate role-based intelligence filtering

### Visible Elements:
- Previous welcome text remains visible
- **Sign In Prompt:** "Sign in as:" (appears after fade-in animation)
- **Role Selection Buttons:**
  - "Media Team" button (blue background, hover effect)
  - "Strategy Head" button (purple background, hover effect)

### Automatic Interactions:
- After 1 second: Media Team role is automatically selected
- Welcome message appears: "Welcome, Media Team"
- Subtext: "Redirecting to your dashboard..."
- After 2.5 seconds: Navigation to radar screen begins

## Screen 3: Intelligence Dashboard - Part 1 (8 seconds)

**Route:** `/radar`  
**Duration:** 8 seconds  
**Purpose:** Display the main intelligence dashboard with analyzed patterns and processing feed

### Visible Elements:

#### Header Section:
- **Page Title:** "Intelligence Brief"
- **Subtitle:** "Since your last login at [time 5 minutes ago]"
- **Tagline:** "5 minutes to full clarity"

#### Main Grid (4 Quadrants):
- **Policy Quadrant** (top-left)
- **Industry Quadrant** (top-right)
- **Advocacy Quadrant** (bottom-left)
- **Risk Quadrant** (bottom-right)

Each quadrant contains:
- Quadrant name and "Pattern Analysis" label
- List of intelligence items with:
  - Title/description
  - Priority indicator (CRITICAL/HIGH/MEDIUM in colored text)
  - Confidence score (percentage)
  - Trend indicators (if applicable)
  - Sign-off buttons for high priority items
  - Visibility indicators (👁 Exclusive or 🔒 Restricted)

#### Processing Feed (Bottom):
- Collapsible panel at bottom of screen
- Header with lightning bolt icon ⚡
- "PROCESSING FEED" title
- Item count in queue
- Status indicators legend (Incoming/Processing/Analyzed)
- Expand/collapse button

### Automatic Interactions:
- After 2 seconds: Processing feed expands automatically
- Feed shows 15 items with real-time status updates:
  - Blue dots = Incoming
  - Yellow pulsing dots = Processing
  - Green dots = Analyzed
- After 5 seconds: Processing feed collapses

## Screen 4: Intelligence Dashboard - Part 2 (5 seconds)

**Route:** `/radar`  
**Duration:** 5 seconds  
**Purpose:** Navigate to detailed issue view

### Visible Elements:
- Same dashboard layout as Screen 3
- Processing feed in collapsed state (showing 2 most recent items)

### Automatic Interactions:
- After 1 second: First high-priority issue in the Policy quadrant is clicked
- Navigation transition begins to issue detail page

## Screen 5: Issue Detail View - Part 1 (6 seconds)

**Route:** `/issue/farmers-20250919`  
**Duration:** 6 seconds  
**Purpose:** Show detailed brief with multiple perspectives and editable content

### Visible Elements:

#### Header:
- **Issue Title:** Large bold text
- **Editable Summary:** Textarea with brief summary (editable)
- **Tweaks Button:** Purple button with settings icon (top right)

#### Three-Column Grid:
- **Risks Card:**
  - Title with "+ Add" button
  - List of risk items (editable textareas)
  - Bullet points with remove (✕) buttons on hover
- **Opportunities Card:**
  - Same structure as Risks
  - List of opportunity items
- **Recommendations Card:**
  - Same structure as above
  - List of recommended actions

#### Perspective Switcher:
- Three buttons: CEO, COO, DIRECTOR
- Active perspective highlighted with ring effect

#### Perspective-Specific Content:
- **Actions List:** Role-specific action items
- **Talking Points List:** Key messages for the role

### Automatic Interactions:
- After 1 second: CEO button is clicked (perspective switches)
- After 2.5 seconds: COO button is clicked (perspective switches)
- After 4 seconds: Page scrolls down smoothly to show assets section

## Screen 6: Issue Detail View - Part 2 (5 seconds)

**Route:** `/issue/farmers-20250919`  
**Duration:** 5 seconds  
**Purpose:** Generate communication assets and navigate to ROI

### Visible Elements:

#### Assets Section:
- **Audience Selector:** Buttons for CEO, COO, Director, Board, Members
- **Generate Button:** With warning "⚠️ AI currently offline - using templates"
- **Generated Assets Grid (after generation):**
  - LinkedIn post (editable textarea)
  - Email paragraph (editable textarea)
  - Press excerpt (editable textarea)

### Automatic Interactions:
- After 1 second: Generate button is clicked
- Loading state shows "Generating..."
- Generated content appears in three columns
- After 3.5 seconds: Navigation to ROI analysis begins

## Screen 7: ROI Analysis (5 seconds)

**Route:** `/roi`  
**Duration:** 5 seconds  
**Purpose:** Display time savings and efficiency metrics

### Visible Elements:
- **Page Title:** "Impact Today" (large, centered)
- **Main Metric:** "[X.X] hours saved" (very large, bold)
- **FTE Equivalent:** "≈ [X.XX] FTE" (below main metric)
- **Comparison:** "Manual: [X.X] hrs → Automated: [X.X] hrs"

### Automatic Interactions:
- After 1.5 seconds: Page scrolls down 200px to ensure full content visibility
- After 3.5 seconds: Navigation to export screen begins

## Screen 8: Export with Dual Signoff (6 seconds)

**Route:** `/export/latest`  
**Duration:** 6 seconds  
**Purpose:** Demonstrate export functionality and role-based signoff requirements

### Visible Elements:
- **Page Title:** "Export Package"
- **Instructions:** "Export requires dual sign-off if enabled. Use the review bar above to sign as Media Team and Strategy Head."
- **Description:** "Download the full brief + assets bundle."
- **Download Button:** "Download ZIP"

#### Review Bar (Top of screen):
- **Human Review Status:** Shows "idle" or "ACTIVE"
- **Interrupt/Resume Button:** Toggle human review mode
- **Media Team Signoff:** Shows ⬜ (unchecked) or ✅ (checked)
- **Strategy Head Signoff:** Shows ⬜ (unchecked) or ✅ (checked)
- **Sign Buttons:** Appear for current user role if not signed

### Automatic Interactions:
- After 2 seconds: User role switches to "Strategy Head"
- Navigation to radar screen occurs
- After 3.5 seconds: Signoff section scrolls into view

## Screen 9: Strategy Head View (4 seconds)

**Route:** `/radar`  
**Duration:** 4 seconds  
**Purpose:** Show role-based filtering from Strategy Head perspective

### Visible Elements:
- Same dashboard layout as Media Team view
- Different set of intelligence items based on Strategy Head visibility permissions
- Items may show different priority levels or exclusive content

### Automatic Interactions:
- After 2 seconds: Navigation to tweaks/learning screen begins

## Screen 10: Learning Loop & Feedback (4 seconds)

**Route:** `/tweaks`  
**Duration:** 4 seconds  
**Purpose:** Demonstrate continuous improvement through feedback loop

### Visible Elements:
- **Page Title:** "Last Week + Tweaks"
- **Description:** "Upload last week's brief or marked-up example to guide this week's output. This builds the learning loop (demo-safe; no publishing)."
- **Upload Section:**
  - File input for uploading prior reports
  - Supported formats note: "PDF/HTML/ZIP accepted"
- **Annotation Section:**
  - Large textarea for feedback
  - Placeholder: "What missed the mark? What to adjust?"
- **Stored Samples Section:**
  - List of previously uploaded samples with timestamps
- **Back to Radar Button:** Navigation option

### Automatic Interactions:
- After 1.5 seconds: Page scrolls down 200px to show more content
- After 4 seconds: Demo completes and restarts from Screen 1

## Additional UI Elements Present Throughout

### Review Bar (Persistent Top Bar):
- Always visible at top of screen
- Shows human review status and signoff checkboxes
- Allows role-based signing actions

### Bottom Left Controls:
- **Reset (R) Button:** Resets demo and returns to welcome screen
- **⌘K Button:** Opens command palette (if enabled)

### Demo Progress Indicators:
- **Top Progress Bar:** Shows overall demo progress
- **Step Description:** Floating pill showing current step description
- **Step Progress Bar:** Shows progress within current step
- **Close Button (X):** Allows manual demo exit
- **Step Dots:** Bottom center dots showing current position in demo

## Key Interactions and Transitions

1. **Role-Based Filtering:** Content changes based on selected user role
2. **Automatic Scrolling:** Smooth scrolling to reveal content at appropriate times
3. **State Persistence:** Selections and edits persist through navigation
4. **Real-Time Updates:** Processing feed shows live status changes
5. **Signoff Flow:** Demonstrates multi-role approval process
6. **Feedback Loop:** Shows how system learns from historical data

## Technical Notes

- Demo runs automatically once started
- Each step has precise timing for actions and transitions
- All interactions are simulated (no actual API calls during demo)
- Demo loops continuously until manually stopped
- Responsive design adapts to screen size