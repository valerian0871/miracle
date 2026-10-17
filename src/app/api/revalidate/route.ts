import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import { type NextRequest, NextResponse } from 'next/server'

type WebhookPayload = { _type?: string }

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return new Response('SANITY_REVALIDATE_SECRET is not set.', { status: 500 })
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret)

    if (!isValidSignature) {
      return new Response('Invalid signature.', { status: 401 })
    }
    if (!body?._type) {
      return new Response('Missing document type.', { status: 400 })
    }

    // { expire: 0 } expires the entry immediately, so the next request sees fresh content.
    // Next.js 16 requires a second argument here; the one-argument form is deprecated.
    revalidateTag(body._type, { expire: 0 })

    return NextResponse.json({ revalidated: body._type })
  } catch (error) {
    console.error('Revalidation failed', error)
    return new Response('Revalidation failed.', { status: 500 })
  }
}