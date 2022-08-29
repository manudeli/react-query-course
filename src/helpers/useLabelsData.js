import { useQuery } from '@tanstack/react-query'
import { defaultLabels } from './defaultData'

export function useLabelsData() {
  return useQuery(
    ['labels'],
    ({ signal }) => {
      return fetch('/api/labels', { signal }).then((res) => res.json())
    },
    {
      staleTime: 1000 * 60 * 60,
      placeholderData: defaultLabels,
    }
  )
}
