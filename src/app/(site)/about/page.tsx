import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Portrait } from '@/components/layout/Portrait'
import { getSettings } from '@/sanity/data'

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const settings = await getSettings()

  return (
    <div className="pb-10 pt-14">
      <Container>
        <h1 className="mt-6 text-h2">About</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Portrait image={settings.portrait} name={settings.name} />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-4 text-lead">
              {settings.aboutParagraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
              ))}
            </div>

            {settings.experience.length > 0 ? (
              <Reveal>
                <section aria-labelledby="experience-title" className="mt-12">
                  <h2 id="experience-title" className="text-h3">
                    Experience
                  </h2>
                  <ul className="mt-4 divide-y divide-line border-y border-line">
                    {settings.experience.map((item) => (
                      <li key={item._key} className="grid gap-1 py-4 md:grid-cols-12 md:gap-3">
                        <p className="text-small text-paper-3 md:col-span-4">{item.period}</p>
                        <div className="md:col-span-8">
                          <p className="text-body font-semibold">{item.organisation}</p>
                          <p className="text-small text-paper-2">{item.role}</p>
                          {item.note ? <p className="mt-1 text-small text-paper-3">{item.note}</p> : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ) : null}

            {settings.education.length > 0 ? (
              <Reveal>
                <section aria-labelledby="education-title" className="mt-12">
                  <h2 id="education-title" className="text-h3">
                    Education
                  </h2>
                  <ul className="mt-4 divide-y divide-line border-y border-line">
                    {settings.education.map((item) => (
                      <li key={item._key} className="grid gap-1 py-4 md:grid-cols-12 md:gap-3">
                        <p className="text-small text-paper-3 md:col-span-4">{item.period}</p>
                        <div className="md:col-span-8">
                          <p className="text-body font-semibold">{item.institution}</p>
                          <p className="text-small text-paper-2">{item.award}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ) : null}

            <div className="mt-12">
              <ButtonLink href="/contact">Get in touch</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}