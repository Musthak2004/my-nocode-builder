
![NoCode Builder](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?style=flat-square&logo=vercel)

# 🚀 NoCode Builder

> Build beautiful, functional web apps without writing a single line of code. Drag, drop, and publish — it's that simple.

NoCode Builder is a full-featured visual app builder designed for small businesses, entrepreneurs, and non-technical creators. With an intuitive drag-and-drop interface, real-time preview, and one-click publishing, anyone can create professional web applications in minutes.

---

## ✨ Features

### 🎨 Drag & Drop Builder
- **10+ Components** — headings, paragraphs, buttons, images, inputs, textareas, dividers, cards, navbars, and footers
- **Intuitive interface** — left panel component library, center canvas, right panel property editor
- **Drag to reorder** — rearrange components freely with smooth animations
- **Real-time editing** — click any component to edit its properties instantly

### 🔧 Property Customization
- **Style controls** — change colors, sizes, alignment, spacing, and more
- **Content editing** — update text, images, and links directly
- **Live preview** — see changes as you make them

### 👤 Authentication & User Management
- **Clerk-powered auth** — secure sign-up/sign-in with social login support
- **Protected routes** — each user sees only their own projects
- **Session management** — automatic redirects, fallback URLs

### 📊 Analytics & Monitoring
- **PostHog analytics** — track pageviews, user actions, and session recordings
- **Sentry error tracking** — automatic error capture with source maps
- **Custom events** — 15+ tracked events (component added, project saved, onboarding, etc.)

### 💬 User Feedback
- **Floating feedback widget** — users can submit bug reports, feature requests, or general feedback
- **5-star rating system** — gauge user satisfaction
- **Admin dashboard** — view all feedback, user stats, and project metrics

### 🎯 Onboarding
- **4-step guided tour** — helps new users get started quickly
- **Progress tracking** — localStorage-based completion tracking
- **Contextual tips** — shows relevant tooltips during first use

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 16 (App Router)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│  │ Landing  │  │Dashboard │  │ Builder  │  │   Preview   │  │
│  │   Page   │  │  Page    │  │  Page    │  │    Page     │  │
│  └──────────┘  └──────────┘  └──────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Builder Core                        │   │
│  │  ┌──────────┐ ┌────────┐ ┌────────────┐ ┌─────────┐ │   │
│  │  │Component │ │ Canvas │ │ Properties │ │Preview  │ │   │
│  │  │  Panel   │ │  (DnD) │ │   Panel    │ │Renderer │ │   │
│  │  └──────────┘ └────────┘ └────────────┘ └─────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │  Auth Clerk  │  │  Supabase DB  │  │  Analytics/Error │  │
│  └──────────────┘  └───────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (Turbopack) | React framework with App Router |
| **Language** | TypeScript 5 | Type-safe development |
| **Styling** | Tailwind CSS v4 | Utility-first styling |
| **Auth** | Clerk 7 | Authentication & user management |
| **Database** | Supabase | PostgreSQL database with RLS |
| **Analytics** | PostHog | Product analytics & session recording |
| **Error Tracking** | Sentry | Error monitoring & source maps |
| **Drag & Drop** | @dnd-kit | Accessible drag-and-drop |
| **State** | Zustand | Lightweight state management |
| **Deployment** | Vercel | Hosting & CI/CD |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** 20+ (or Bun 1.0+)
- **npm** or **bun**
- Accounts for: [Clerk](https://clerk.com), [Supabase](https://supabase.com), [PostHog](https://posthog.com), [Sentry](https://sentry.io) (optional but recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Musthak2004/my-nocode-builder.git
cd my-nocode-builder

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Fill in your `.env.local` with the following:

```env
# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# PostHog (Analytics)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com

# Sentry (Error Tracking - optional)
NEXT_PUBLIC_SENTRY_DSN=https://...@...ingest.sentry.io/...
SENTRY_DSN=https://...@...ingest.sentry.io/...
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=sntrys_...

# Admin
ADMIN_USER_ID=user_... (your Clerk user ID)
```

### Database Setup

Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor to create the feedback table.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start building.

---

## 🗺️ Project Structure

```
my-nocode-builder/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout (Clerk, PostHog providers)
│   │   ├── globals.css           # Global styles & design tokens
│   │   ├── dashboard/page.tsx    # User dashboard
│   │   ├── builder/[id]/page.tsx # Visual builder
│   │   ├── preview/[id]/page.tsx # Preview mode
│   │   ├── sign-in/              # Sign-in page
│   │   ├── sign-up/              # Sign-up page
│   │   ├── admin/page.tsx        # Admin dashboard
│   │   └── api/
│   │       ├── projects/         # CRUD API routes
│   │       └── feedback/         # Feedback submission API
│   ├── components/
│   │   ├── builder/
│   │   │   ├── Canvas.tsx        # Drag-and-drop canvas
│   │   │   ├── ComponentPanel.tsx# Component library panel
│   │   │   ├── PropertiesPanel.tsx# Property editor panel
│   │   │   ├── BuilderNavbar.tsx # Builder top bar
│   │   │   ├── ComponentRenderer.tsx
│   │   │   └── SortableComponent.tsx
│   │   ├── providers/
│   │   │   └── PostHogProvider.tsx
│   │   ├── onboarding/
│   │   │   └── OnboardingModal.tsx
│   │   ├── feedback/
│   │   │   └── FeedbackWidget.tsx
│   │   └── ErrorBoundary.tsx
│   ├── store/
│   │   └── builderStore.ts       # Zustand state management
│   ├── lib/
│   │   ├── analytics.ts          # Analytics event definitions
│   │   ├── posthog.ts            # PostHog client
│   │   └── sentry.ts             # Sentry utilities
│   └── types/
│       └── builder.ts            # TypeScript types
├── sentry.client.config.ts       # Sentry client config
├── sentry.server.config.ts       # Sentry server config
├── instrumentation.ts            # Next.js instrumentation
├── next.config.ts                # Next.js + Sentry config
└── supabase-schema.sql           # Database schema
```

---

## 🧪 Testing

Use `TESTING_NOTES.md` as a guide for running user testing sessions with:
1. Sign Up
2. Create First Project
3. Add Components
4. Edit Properties
5. Save and Preview

---

## 🚢 Deployment

The app is deployed on [Vercel](https://vercel.com). Every push to `main` triggers an automatic deployment.

```bash
# Manual deployment
npx vercel --prod
```

Environment variables are managed via `vercel env add` and automatically linked to the production and preview environments.

---

## 📄 License

This project is private and not licensed for external use.

---

<p align="center">
  Built with ❤️ for small businesses and makers
  <br>
  <a href="https://my-nocode-builder-six.vercel.app">Live App</a>
</p>
