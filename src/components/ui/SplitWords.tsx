/**
 * Wraps each word in a span for word-by-word animation. Screen readers get the
 * sentence once, as written, instead of word fragments.
 */
export function SplitWords({ text, wordClassName = '' }: { text: string; wordClassName?: string }) {
  const words = text.split(/\s+/).filter(Boolean)
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${index}-${word}`} data-word className={`inline-block ${wordClassName}`}>
            {word}
            {index < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </>
  )
}
