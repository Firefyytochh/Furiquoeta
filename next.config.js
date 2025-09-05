/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
}

module.exports = nextConfig
