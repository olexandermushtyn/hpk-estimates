import useCollection from 'hooks/useCollection'

export default function useStudents(props) {
  const ref = 'students'

  const [value, loading, error, next, loadingMore, loadMoreAvailable] =
    useCollection({
      ref,
      ...props
    })

  return [value, loading, error, next, loadingMore, loadMoreAvailable]
}
