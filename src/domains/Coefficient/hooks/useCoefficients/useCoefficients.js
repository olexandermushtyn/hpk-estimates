import useCollection from 'hooks/useCollection'

export default function useCoefficients(props) {
  const ref = 'coefficients'

  const [value, loading, error, next, loadingMore, loadMoreAvailable] =
    useCollection({
      ref,
      ...props
    })

  return [value, loading, error, next, loadingMore, loadMoreAvailable]
}
