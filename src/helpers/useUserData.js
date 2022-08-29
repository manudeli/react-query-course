import { useQuery } from '@tanstack/react-query'

export function useUserData(userId) {
  return useQuery(
    ['users', userId],
    ({ signal }) => {
      return fetch(`/api/users/${userId}`, { signal }).then((res) => res.json())
    },
    {
      enabled: !!userId,
      staleTime: 1000 * 60 * 5,
    }
  )
}
