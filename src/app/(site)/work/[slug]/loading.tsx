import { Container } from '@/components/ui/Container'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <Container className="pb-20 pt-14">
      <p role="status" className="sr-only">
        Loading case study
      </p>
      <Skeleton className="mt-3 h-3 w-24" />
      <Skeleton className="mt-4 h-12 w-full max-w-3xl" />
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
      </div>
      <Skeleton className="mt-8 aspect-[16/9] w-full" />
    </Container>
  )
}