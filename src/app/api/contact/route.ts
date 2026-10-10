import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const MIN_FILL_MS = 2000
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Remembers recent submissions per address. On a serverless host each instance has its own
// memory, so this slows a burst from one instance but is not a hard limit.
const recent = new Map<string, number[]>()

function isLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  hits.push(now)
  recent.set(ip, hits)
  return hits.length > MAX_PER_WINDOW
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status })
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) return fail('The contact form is not set up yet.', 503)

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isLimited(ip)) return fail('Too many messages. Please try again later.', 429)

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return fail('The message could not be read.', 400)

  // Spam traps. Answer "ok" so a bot learns nothing.
  const elapsed = typeof body.elapsed === 'number' ? body.elapsed : 0
  if (clean(body.company, 200) !== '' || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true })
  }

  const name = clean(body.name, 100).replace(/[\r\n]+/g, ' ')
  const email = clean(body.email, 200)
  const message = clean(body.message, 4000)

  if (!name || !EMAIL.test(email) || message.length < 10) {
    return fail('Please give your name, a valid email address and a message of at least 10 characters.', 400)
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    console.error('Resend could not send the message', error)
    return fail('The message could not be sent. Please try again shortly.', 502)
  }

  return NextResponse.json({ ok: true })
}