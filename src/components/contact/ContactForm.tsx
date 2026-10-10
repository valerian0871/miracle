'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { SubmitButton } from '@/components/ui/SubmitButton'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIELD =
  'w-full rounded-sm border border-line-strong bg-ink-raised px-2 text-body text-paper placeholder:text-paper-3 transition-colors duration-(--duration-base) ease-brand hover:border-paper-3 focus-visible:border-accent'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const openedAt = useRef(0)

  useEffect(() => {
    openedAt.current = Date.now()
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    // Read these before the first await: the event's currentTarget is cleared afterwards
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          company: data.get('company'),
          elapsed: Date.now() - openedAt.current,
        }),
      })
      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null

      if (response.ok && result?.ok) {
        form.reset()
        setStatus('sent')
        return
      }
      setErrorMessage(result?.error ?? 'Something went wrong. Please try again.')
      setStatus('error')
    } catch {
      setErrorMessage('The message could not be sent. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-md border border-line-strong bg-ink-raised p-4">
        <p className="font-display text-h3 uppercase">Message sent</p>
        <p className="mt-2 text-paper-2">Thank you. I will reply to the address you gave.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn btn-secondary mt-4">
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-small text-paper-2">
          Your name
        </label>
        <input id="contact-name" name="name" type="text" required maxLength={100} autoComplete="name" className={`${FIELD} h-6`} />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1 block text-small text-paper-2">
          Your email
        </label>
        <input id="contact-email" name="email" type="email" required maxLength={200} autoComplete="email" className={`${FIELD} h-6`} />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-small text-paper-2">
          About the project
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={7}
          placeholder="The brief, the audience and the timeline"
          className={`${FIELD} py-2`}
        />
      </div>

      {/* Honeypot: hidden from people and assistive technology, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' ? (
        <p role="alert" className="text-small text-danger">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton loading={status === 'sending'}>Send message</SubmitButton>
        <p className="max-w-xs text-caption text-paper-3">
          Your message is emailed to me and not stored on this site. Resend delivers the email.
        </p>
      </div>
    </form>
  )
}