import useCollection from 'hooks/useCollection'

export default function useMarks(props) {
  const ref = 'marks'

  const [value, loading, error, next, loadingMore, loadMoreAvailable] =
    useCollection({
      ref,
      ...props
    })

  return [value, loading, error, next, loadingMore, loadMoreAvailable]
}
