import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

/**
 * Favicon route handler - serves favicon.ico as a fallback
 * This is useful for VPS deployments where static file serving might not be properly configured
 * Vercel handles static files automatically, but VPS requires manual configuration
 */
export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'favicon.ico')
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new Response('Favicon not found', { status: 404 })
    }
    
    const fileBuffer = fs.readFileSync(filePath)
    
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error serving favicon:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

// Handle HEAD requests for favicon
export async function HEAD(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'favicon.ico')
    
    if (!fs.existsSync(filePath)) {
      return new Response(null, { status: 404 })
    }
    
    const stats = fs.statSync(filePath)
    
    return new Response(null, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': stats.size.toString(),
      },
    })
  } catch (error) {
    console.error('Error serving favicon HEAD:', error)
    return new Response(null, { status: 500 })
  }
}