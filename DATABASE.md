# Database Management Guide

## Supabase Setup

This project uses **Supabase** for backend database management. Use the VS Code tasks to manage your database.

## VS Code Database Tasks

Access these tasks via `Terminal → Run Task` or press `Cmd+Shift+P` and search "Run Task":

### **db: push schema**
Sync your local Supabase schema changes to the remote database.
```bash
npx supabase db push
```

### **db: pull schema**
Pull the latest schema from your remote Supabase database to your local environment.
```bash
npx supabase db pull
```

### **db: generate types**
Generate TypeScript types from your database schema. Creates types in `lib/database.types.ts`.
```bash
npx supabase gen types typescript --linked
```

### **db: reset local**
Reset your local Supabase database to a clean state (development only).
```bash
npx supabase db reset
```

### **db: view migrations**
List all database migrations in the `supabase/migrations` directory.
```bash
ls -la supabase/migrations
```

### **db: create migration**
Create a new migration file for schema changes.
```bash
npx supabase migration new
```

## Database Seeding

Seed your database with initial data for development and testing.

### **seed: run**
Execute the seed script to populate your database.
```bash
bun scripts/seed.ts
```

### **seed: clear**
Clear all seeded data (development only).
```bash
bun scripts/seed.ts --clear
```

Or use npm scripts:
```bash
bun seed        # Run seed
bun seed:clear  # Clear seed data
```

## Setting Up Seeds

Edit `src/lib/seed.ts` to define your seed data:

```typescript
import { supabase } from "./supabase";

export async function seedDatabase() {
  // Insert test users
  const { data: users } = await supabase
    .from("users")
    .insert([
      { email: "user1@example.com", name: "User One" },
      { email: "user2@example.com", name: "User Two" },
    ])
    .select();

  // Insert test scores
  await supabase
    .from("game_scores")
    .insert([
      { user_id: users?.[0]?.id, score: 1000 },
      { user_id: users?.[1]?.id, score: 1500 },
    ]);

  console.log("✅ Database seed completed!");
}
```

## Workflow

### 1. Create a Schema Locally

```sql
-- supabase/migrations/[timestamp]_create_table_name.sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

### 2. Generate Types

Run **db: generate types** to create TypeScript interfaces from your schema.

### 3. Push to Remote

Run **db: push schema** to deploy your changes to Supabase.

## Using Generated Types

After running **db: generate types**, import types in your components:

```typescript
import type { Tables } from '@/lib/database.types';

type User = Tables<'users'>;

const user: User = {
  id: '123',
  email: 'user@example.com',
  created_at: new Date()
};
```

## Environment Variables

Ensure your `.env` file has:

```
REACT_APP_SUPABASE_URL=https://wdthdcdoqdtywngwvddk.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_KEY=sb_publishable_vzQtIdfzdHky1NgwopsjzQ_50nux0vG
```

## Resources

- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Database Migrations](https://supabase.com/docs/guides/cli/managing-db-migrations)
- [Generating Types](https://supabase.com/docs/guides/api/rest/generating-types)
