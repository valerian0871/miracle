import { notFound } from 'next/navigation'

/** Sends any unknown URL to the site's own 404 page, inside the site layout */
export default function CatchAll() {
  return notFound()
}