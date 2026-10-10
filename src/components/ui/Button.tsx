import Link from 'next/link'
import type { ComponentProps } from 'react'

type Variant = 'primary' | 'secondary'

const styles = (variant: Variant, extra?: string) => `btn btn-${variant}${extra ? ` ${extra}` : ''}`

export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={styles(variant, className)} {...props} />
}