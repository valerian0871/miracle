import type { ReactNode } from 'react'

type Props = {
  loading: boolean
  loadingLabel?: string
  children: ReactNode
}

export function SubmitButton({ loading, loadingLabel = 'Sending', children }: Props) {
  return (
    <button type="submit" className="btn btn-primary" disabled={loading} aria-busy={loading}>
      {loading ? (
        <>
          <span className="spinner" aria-hidden="true" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}