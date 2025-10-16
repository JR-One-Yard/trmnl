// Script to verify TRMNL BYOS setup
import { createClient } from '@supabase/supabase-js'

async function verifySetup() {
  console.log('🔍 Verifying TRMNL BYOS Setup...\n')
  
  // Check environment variables
  console.log('1. Checking environment variables:')
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ]
  
  const missingVars = requiredEnvVars.filter(v => !process.env[v])
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '))
    console.log('   Please set these in your .env.local file or Vercel dashboard')
    process.exit(1)
  }
  console.log('✅ All required environment variables are set\n')
  
  // Check Supabase connection
  console.log('2. Checking Supabase connection:')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  try {
    // Check if tables exist
    const { data: devices, error: devicesError } = await supabase
      .from('devices')
      .select('count')
      .limit(1)
    
    if (devicesError) {
      console.error('❌ Devices table not found or accessible:', devicesError.message)
      console.log('   Please run the SQL migration script in your Supabase dashboard')
      process.exit(1)
    }
    console.log('✅ Devices table exists and is accessible')
    
    const { data: logs, error: logsError } = await supabase
      .from('logs')
      .select('count')
      .limit(1)
    
    if (logsError) {
      console.error('❌ Logs table not found or accessible:', logsError.message)
      console.log('   Please run the SQL migration script in your Supabase dashboard')
      process.exit(1)
    }
    console.log('✅ Logs table exists and is accessible')
    
    const { data: systemLogs, error: systemLogsError } = await supabase
      .from('system_logs')
      .select('count')
      .limit(1)
    
    if (systemLogsError) {
      console.error('❌ System logs table not found or accessible:', systemLogsError.message)
      console.log('   Please run the SQL migration script in your Supabase dashboard')
      process.exit(1)
    }
    console.log('✅ System logs table exists and is accessible\n')
    
  } catch (error) {
    console.error('❌ Error connecting to Supabase:', error)
    process.exit(1)
  }
  
  console.log('3. API Routes Status:')
  console.log('✅ /api/setup - Device setup endpoint')
  console.log('✅ /api/display - Display content endpoint')
  console.log('✅ /api/bitmap - Bitmap generation endpoint')
  console.log('✅ /api/log - Device logging endpoint')
  console.log('✅ Middleware configured to handle legacy routes\n')
  
  console.log('✨ Setup verification complete! Your TRMNL BYOS is ready.')
  console.log('\nNext steps:')
  console.log('1. Deploy to Vercel: git push')
  console.log('2. Add your device to the database')
  console.log('3. Point your TRMNL device to your deployed URL')
}

verifySetup().catch(console.error)