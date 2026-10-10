import type { ElementType, ReactNode } from 'react'

type Props = {
  as?: ElementType
  className?: string
  children: ReactNode
}

/** The page width and gutters. Every section uses it, so content edges always align. */
export function Container({ as: Tag = 'div', className = '', children }: Props) {
  return <Tag className={`mx-auto w-full max-w-page px-3 md:px-5 xl:px-8 ${className}`}>{children}</Tag>
}