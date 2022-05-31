import useCollection from 'hooks/useCollection'

export default function useLessons(props) {
  const ref = 'lessons'

  const [value, loading, error, next, loadingMore, loadMoreAvailable] =
    useCollection({
      ref,
      ...props
    })

  return [value, loading, error, next, loadingMore, loadMoreAvailable]
}
