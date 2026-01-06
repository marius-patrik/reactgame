# React Game Project

A modern React TypeScript project with Rsbuild, shadcn/ui, Tailwind CSS, Wouter routing, Supabase, and Vercel deployment ready.

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Rsbuild** - Ultra-fast build tool
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Wouter** - Lightweight routing
- **Supabase** - Backend & PostgreSQL
- **Vercel** - Deployment platform
- **Bun** - Fast package manager
- **Biomejs** - Fast linter and formatter
- **Tabler Icons** - Beautiful icon library

## 📦 Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- Node.js 18+ (if using npm/pnpm)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Then edit `.env`:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 3. Run Development Server

```bash
bun run dev
```

The app will open at `http://localhost:3000`

## 📝 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run type-check` - Check TypeScript types
- `bun run lint` - Run Biomejs linter and fix issues
- `bun run format` - Format code with Biomejs
- `bun run check` - Check code quality

### VS Code Tasks

Press `Cmd+Shift+B` or go to Terminal → Run Task to execute:
- **dev** - Start development server
- **build** - Build for production
- **lint** - Run linter and fix issues
- **format** - Format code
- **type-check** - Check TypeScript types

## 🔧 Adding shadcn/ui Components

To add shadcn/ui components to your project:

```bash
bun exec shadcn-ui add button
bun exec shadcn-ui add card
# etc...
```

Components will be added to `src/components/ui/`

## 🗄️ Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details and create database
4. Wait for project to initialize

### 2. Get Your Credentials

1. Go to Project Settings → API
2. Copy **Project URL** and **Anon Key**
3. Add them to `.env.local`

### 3. Create Tables

Use the Supabase Dashboard SQL Editor to create your tables. Example:

```sql
CREATE TABLE game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  score INT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

### 4. Use Supabase in Your App

```typescript
import { supabase } from "@/lib/supabase";

// Fetch data
const { data, error } = await supabase
  .from("game_scores")
  .select("*")
  .order("score", { ascending: false });

// Insert data
await supabase
  .from("game_scores")
  .insert([{ user_id, score }]);
```

## 🚀 Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/react-game-project.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click "Deploy"

Your app is now live! 🎉

## 📁 Project Structure

```
src/
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── pages/              # Page components (Home, About, etc)
├── lib/                # Utilities and configurations
│   └── supabase.ts    # Supabase client
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
├── globals.css         # Global styles
└── index.html          # HTML template

rsbuild.config.ts       # Rsbuild configuration
tailwind.config.ts      # Tailwind configuration
tsconfig.json           # TypeScript configuration
.env.local              # Local environment variables
```

## 🎯 Routing with Wouter

Routes are defined in `App.tsx`:

```typescript
import { Router, Route, Link } from "wouter";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Router>
  );
}
```

## 🎨 Styling

This project uses Tailwind CSS for styling. Customize your theme in `tailwind.config.ts`.

## 📚 Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Rsbuild Docs](https://rsbuild.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Wouter Docs](https://github.com/molefrog/wouter)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)

## 📄 License

MIT
