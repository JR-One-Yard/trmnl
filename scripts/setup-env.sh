#!/bin/bash

# Script to help set up environment variables for TRMNL BYOS

echo "🔧 TRMNL BYOS Environment Setup"
echo "================================"
echo ""
echo "Please have your Supabase credentials ready."
echo "You can find them in:"
echo "1. Vercel Dashboard → Your Project → Settings → Environment Variables"
echo "2. Supabase Dashboard → Your Project → Settings → API"
echo ""

# Create .env.local if it doesn't exist
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Prompt for Supabase URL
echo "Enter your NEXT_PUBLIC_SUPABASE_URL:"
echo "(Example: https://xxxxxxxxxxxxx.supabase.co)"
read -r SUPABASE_URL

# Prompt for Anon Key
echo ""
echo "Enter your NEXT_PUBLIC_SUPABASE_ANON_KEY:"
echo "(This is the 'anon public' key from Supabase)"
read -r ANON_KEY

# Prompt for Service Role Key
echo ""
echo "Enter your SUPABASE_SERVICE_ROLE_KEY:"
echo "(This is the 'service_role' key from Supabase - keep this secret!)"
read -r SERVICE_KEY

# Write to .env.local
cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_KEY

# Additional Supabase variables (same values)
SUPABASE_URL=$SUPABASE_URL
SUPABASE_ANON_KEY=$ANON_KEY
EOF

echo ""
echo "✅ .env.local file created successfully!"
echo ""
echo "Now running verification..."
echo ""

# Run verification
npm run verify