# Mark Institute of Technology — Project Architecture Map

This document outlines the organized folder and page structure of the **Mark Institute of Technology** web project.

---

## 📁 Directory Tree Overview

```
AP6/
├── index.html                  # Root entrypoint (instant redirect to public/home.html)
├── PROJECT_MAP.md              # Architecture & routing documentation
│
├── public/                     # 🌐 Public Marketing & Information Zone
│   ├── home.html               # Public Homepage & Campus Announcements
│   ├── about.html              # About Us, Mission & Core Values
│   ├── programs.html           # Degree Programs & Academic Tracks
│   ├── faculty.html            # Faculty Directory & Department Heads
│   ├── admissions.html         # Tuition Calculator & Application Flow
│   ├── events.html             # Campus Calendar & Workshop Filter
│   ├── contact.html            # Inquiries & Contact Form
│   ├── resources.html          # Reference Guides & MDN Docs
│   ├── modal.html              # Interactive Demo Modal Component
│   └── 404.html                # Error Not-Found Page
│
├── student/                    # 🎓 Student Zone
│   ├── login.html              # Student Login Form
│   ├── portal.html             # Student Dashboard, Schedule & Groups
│   ├── lessons.html            # JavaScript Basics Curriculum
│   ├── playground.html         # Interactive In-Browser JS Sandbox
│   └── quiz.html               # 8-Question Knowledge Check
│
├── admin/                      # 🛡️ Staff & Administration Zone
│   ├── admin-login.html        # Secure Staff Login
│   └── admin-portal.html       # Admissions CRM, Event & Faculty Manager
│
└── assets/                     # 🎨 Shared Assets & Modular Styles (100% External CSS)
    ├── css/                    # Modular Component Stylesheets (Zero <style> in HTML)
    │   ├── style.css           # Master Entrypoint (imports all components via @import)
    │   ├── tokens.css          # Design Tokens, Theme & Typography
    │   ├── base.css            # Reset, Shell Layout & Footer
    │   ├── background.css      # Cyber Particle Grid & Video Backgrounds
    │   ├── nav.css             # Top Navigation Bar & Brand
    │   ├── sidebar.css         # Sidebar Navigation, File Lists & Logout
    │   ├── buttons.css         # Interactive Buttons & Animations
    │   ├── code.css            # Code Windows & Syntax Highlighting
    │   ├── modal.css           # Reusable Modal Dialog Components
    │   ├── portal.css          # Student & Admin Portals & Dashboards
    │   ├── learning.css        # Lessons, Code Playground & Quiz
    │   ├── auth.css            # Shared Login Forms, Validation & Switch Cards
    │   └── pages.css           # Public Marketing Pages, Cards & Grids
    ├── js/
    │   ├── nav.js              # Centralized Navigation Bar (auto-paths across public, student, admin)
    │   ├── tech-bg.js          # Animated Particle Grid Canvas
    │   ├── modal.js            # Reusable Dialog Controller
    │   └── bg-video.js         # Background Video Controller
    └── video/                  # Video Media Fallbacks
```

---

## 🧭 Page Categories & Responsibilities

### 1. Public Zone (`public/`)
| File | Role | Key Features |
| :--- | :--- | :--- |
| `home.html` | Front Page | Hero banner, live student/program stats, interactive announcements list |
| `about.html` | Institutional Profile | College history, core values cards, leadership principles |
| `programs.html` | Academic Offerings | Interactive program filter tabs (All, CS, IT, Data, Web) |
| `faculty.html` | Faculty Directory | Real-time live text search filtering faculty cards by name or department |
| `admissions.html`| Admissions Flow | Dynamic tuition calculator (units & residency) & admissions inquiry form |
| `events.html` | Events Calendar | Filterable campus events list by category |
| `contact.html` | Contact Directory | Campus department contacts and fast message dispatch |
| `resources.html`| Developer References | Course resources and reference documentation |
| `modal.html` | Modal Playground | Live testing ground for the centralized modal system |
| `404.html` | Error Handling | Cyber error screen with return button |

### 2. Student Zone (`student/`)
| File | Role | Key Features |
| :--- | :--- | :--- |
| `login.html` | Student Portal Auth | Form validation, stores demo session (`markDemoStudent`), links to apply |
| `portal.html` | Student Dashboard | Interactive stats, course quicklinks, RSVP events & student study groups |
| `lessons.html` | Curriculum Viewer | Structured JS curriculum files with syntax highlighting |
| `playground.html`| Code Sandbox | Live in-browser JS executor with `console.log` capture |
| `quiz.html` | Interactive Quiz | 8-question graded assessment with score calculator |

### 3. Admin Zone (`admin/`)
| File | Role | Key Features |
| :--- | :--- | :--- |
| `admin-login.html` | Staff Portal Auth | Form validation, stores staff session (`markDemoAdmin`) |
| `admin-portal.html`| Admin Dashboard | Application enrollment manager, event creation/removal, faculty editor |

---

## 🔗 Relative Linking Rules
- **From `public/` pages**:
  - Other public pages: `about.html`, `programs.html` (direct siblings)
  - Student area: `../student/login.html`
  - Admin area: `../admin/admin-login.html`
  - Assets: `../assets/css/style.css`, `../assets/js/...`
- **From `student/` pages**:
  - Public pages: `../public/home.html`, `../public/about.html`
  - Other student pages: `portal.html`, `lessons.html` (direct siblings)
  - Assets: `../assets/css/style.css`, `../assets/js/...`
- **From `admin/` pages**:
  - Public pages: `../public/home.html`
  - Student area: `../student/login.html`
  - Other admin pages: `admin-portal.html` (direct sibling)
  - Assets: `../assets/css/style.css`, `../assets/js/...`
- **From root `/`**:
  - `index.html`: Automatically redirects to `public/home.html`
