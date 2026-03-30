const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
const PORT = parseInt(Deno.env.get('PORT') || '8000')

interface Message {
  role: string
  content: string
}

interface RequestBody {
  message: string
  conversationHistory: Message[]
}

// Rate limiting - simple in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 100 // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    // New window
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// Portfolio context for the AI
const PORTFOLIO_CONTEXT = `You are an AI assistant on Kenji "Brocks" Tabugadir's portfolio website.

About Kenji:
- Full Name: Kenji "Brocks" I. Tabugadir
- Location: Santa Ana, Cagayan, Philippines
- Role: IT Student, Linux & Server Enthusiast, Full-Stack Developer
- Education: Bachelor of Science in Information Technology at Cagayan State University (2022-Present)
- Achievement: Champion in Dynamic Web Designing at Technolympics 2025

Technical Skills:
- Frontend: React, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, Vite, Bootstrap, Figma
- Backend: C#, .NET MAUI, Python, PHP, Java, Node.js, Deno
- Database: PostgreSQL, MariaDB, MySQL, Supabase
- DevOps: Docker, Linux, Apache, Git

Notable Projects:
1. Portfolio V2 - Minimalist portfolio with AI chat (React, TypeScript, Tailwind, Deno, Gemini AI)
2. Linux Hive - Home passive-income server project (Linux/Debian 13, Docker, Bash, Honeygain)
3. TRACE System - Role-based alumni management system (React, FastAPI, PostgreSQL, Tailwind CSS)

Contact: tabugadirkenjibrocks@gmail.com
Social: GitHub (Wacky-sama), LinkedIn, Twitter (@Kenji_samaaa)

Personality: Linux enthusiast, self-hosted infrastructure advocate, loves building and tinkering with servers.

When visitors ask about Kenji, his projects, or skills, provide accurate information based on the above context.
For general questions, be helpful and conversational. Keep responses concise and friendly.
If asked about contacting Brocks, provide his email or social media links.`

async function handleChatRequest(req: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://kenjibrocks.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate API key
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    // Parse request body
    const { message, conversationHistory }: RequestBody = await req.json()

    if (!message || typeof message !== 'string' || message.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Invalid message format or length' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Build conversation for Gemini
    const contents = [
      {
        role: "user",
        parts: [{ text: PORTFOLIO_CONTEXT }]
      },
      {
        role: "model",
        parts: [{ text: "Understood! I'm ready to assist visitors on Kenjis' portfolio." }]
      }
    ]

    // Add conversation history (limit to last 10 messages to avoid token limits)
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-10)
      for (const msg of recentHistory) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        })
      }
    }

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    })

    // Call Gemini API
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    })

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('Gemini API error:', errorText)
      throw new Error(`Gemini API error: ${geminiResponse.status}`)
    }

    const data = await geminiResponse.json()
    
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                        "I'm having trouble responding right now. Please try again."

    return new Response(
      JSON.stringify({ response: responseText }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Start server
// console.log(`Chat API server running on http://localhost:${PORT}`)
// console.log(`Endpoint: POST http://localhost:${PORT}/chat`)

Deno.serve({ port: PORT }, async (req) => {
  const url = new URL(req.url)
  
  if (url.pathname === '/chat') {
    return await handleChatRequest(req)
  }
  
  // Health check endpoint
  if (url.pathname === '/health') {
    return new Response(JSON.stringify({ status: 'ok' }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  return new Response('Not Found', { status: 404 })
})