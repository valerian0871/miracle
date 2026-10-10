import type { Metadata } from 'next'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { ContactForm } from '@/components/contact/ContactForm'
import { Container } from '@/components/ui/Container'
import { getSettings } from '@/sanity/data'

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const settings = await getSettings()

  return (
    <div className="pb-10 pt-14">
      <Container>
        <h1 className="mt-6 text-h2">Contact</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-lead text-paper-2">
              Tell me about the brief, who it is for and when it is due. If you are asking about a campaign shown
              here, name it and I will start there.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4 lg:col-start-9" aria-label="Other ways to reach me">
            {settings.publicEmail ? (
              <div>
                <p className="text-caption uppercase tracking-widest text-paper-3">Email</p>
                <a href={`mailto:${settings.publicEmail}`} className="link-line mt-1 inline-block text-body">
                  {settings.publicEmail}
                </a>
              </div>
            ) : null}

            {settings.location ? (
              <div>
                <p className="text-caption uppercase tracking-widest text-paper-3">Based in</p>
                <p className="mt-1 text-body">{settings.location}</p>
              </div>
            ) : null}

            {settings.availability ? (
              <div>
                <p className="text-caption uppercase tracking-widest text-paper-3">Availability</p>
                <p className="mt-1 text-body">{settings.availability}</p>
              </div>
            ) : null}

            {settings.socials.length > 0 ? (
              <div>
                <p className="mb-1 text-caption uppercase tracking-widest text-paper-3">Elsewhere</p>
                <SocialLinks links={settings.socials} />
              </div>
            ) : null}
          </aside>
        </div>
      </Container>
    </div>
  )
}