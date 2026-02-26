LocalLoop
Gamified Civic Engagement Platform
Overview
LocalLoop is a frontend-only React + TypeScript prototype designed to encourage community engagement with small, local businesses through structured daily challenges and gamified quest systems.
The platform transforms everyday civic interactions into measurable local momentum using a simple XP progression model and visual impact tracking.
This project was developed as a competition prototype and intentionally scoped as a client-side application without backend persistence.
Problem Statement
Small businesses often struggle with consistent community engagement and visibility.
At the same time, civic participation lacks structure and measurable feedback.
LocalLoop addresses this gap by:
Providing curated daily challenges
Encouraging physical and digital engagement
Tracking participation through XP and leveling
Visually representing community progress
Core Features
1. Home Page
Mission-driven hero section
User account display (Andy Jin)
Daily Challenge interaction
XP and Level progression (in-memory)
3 impact visuals:
Participation growth chart (static)
Category distribution chart (static)
Animated community goal tank (48% toward $5,000 goal)
2. Discover Page
Google Maps-style layout
Static map visualization
Four curated civic quests
Quest activation animation
Green visual feedback on selection
3. Quests Page
Ongoing quest section
Quest catalog section
Static Top 8 leaderboard
Quest completion interaction:
Confetti animation
XP increase animation
Quest removal from ongoing list
XP & Level System
XP is stored in memory using React state.
Completing a quest increases XP
Level is derived using:
level = 1 + floor(xp / 250)
All data resets on page refresh.
Technical Architecture
Stack
React
TypeScript
Vite
Architecture Principles
Component-based structure
Centralized state management
Strong TypeScript typing
Separation of UI and logic
Modular file organization
State Management
Minimal in-memory state:
xp
activeQuests
questCatalog
leaderboard (static)
No backend.
No database.
No external APIs.
Data Handling
Quests stored as typed arrays
Leaderboard stored as static dataset
XP dynamically recalculated on completion
Derived state used for level calculation
This demonstrates structured data usage and clear variable scope control.
User Experience Design
The interface emphasizes:
Clear user journey: Home → Discover → Quests
Familiar mental models (map layout inspired by Google Maps)
Visual hierarchy and spacing
Animated feedback (confetti, glow effects, fluid tank)
Color-coded progression cues (green = success)
The animated goal tank visually represents collective community momentum.
Scope & Limitations
This is a frontend prototype intended to demonstrate:
System design
Interaction flow
Modular programming
UX rationale
It does not include:
Backend persistence
Real-time database
Authentication
API integrations
All data resets on refresh by design.
Future Expansion
Potential next steps include:
Backend integration for persistent XP tracking
Business verification system
Real-time community metrics
Dynamic map integration
QR or NFC-based engagement validation
Data export and reporting
Project Structure
src/
  components/
  pages/
  assets/
  store.tsx
  data.ts
  types.ts
  router.tsx
  App.tsx
  main.tsx

