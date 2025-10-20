# Setting Up Environment Variables

Since we need browser authentication for Vercel CLI, here are two options to get your environment variables:

## Option 1: Manual Setup from Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **trmnl-d6hc**
3. Navigate to **Settings** → **Environment Variables**
4. Copy each of these values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

5. Create a `.env.local` file with your values:

```bash
# Create the file
touch .env.local

# Then add your values (replace with actual values from Vercel):
echo 'NEXT_PUBLIC_SUPABASE_URL=your-url-here' >> .env.local
echo 'NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here' >> .env.local
echo 'SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here' >> .env.local
```

## Option 2: Use Vercel CLI (after logging in)

1. Open a new terminal and run:
```bash
vercel login
```

2. Click the link or press ENTER to open the browser
3. Authenticate with your Vercel account

4. Then run these commands:
```bash
cd "/Users/jamesroberts/Desktop/Projects Collection/Projects/TRMNL/byos_next"
vercel link
vercel env pull .env.local
```

## Option 3: Get from Supabase Dashboard Directly

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **supabase-yellow-zebra**
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

5. Create `.env.local` with these values

## After Setup

Once you have the `.env.local` file created, run:
```bash
npm run verify
```

This will verify that your setup is complete and ready!