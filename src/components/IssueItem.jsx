import { Link } from 'react-router-dom'
import { GoIssueOpened, GoComment, GoIssueClosed } from 'react-icons/go'
import { relativeDate } from '../helpers/relativeDate'
import { Label } from './Label'
import { useUserData } from '../helpers/useUserData'
import { useQueryClient } from '@tanstack/react-query'
import fetchWithError from '../helpers/fetchWithError'

export function IssueItem({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) {
  const userQuery = useUserData(assignee)
  const queryClient = useQueryClient()

  return (
    <li
      onMouseEnter={() => {
        queryClient.prefetchQuery(['issues', number.toString()], () =>
          fetchWithError(`/api/issues/${number}`)
        )
        queryClient.prefetchInfiniteQuery(
          ['issues', number.toString(), 'comments'],
          () => fetchWithError(`/api/issues/${number}/comments?page=1`)
        )
      }}
    >
      <div>
        {status === 'done' || status === 'canceled' ? (
          <GoIssueClosed style={{ color: 'red' }} />
        ) : (
          <GoIssueOpened style={{ color: 'green' }} />
        )}
      </div>
      <div>
        <Link to={`/issue/${number}`}>{title}</Link>
        {labels.map((label) => (
          <Label key={label} label={label} />
        ))}
        <div>
          <small>
            #{number} opened {relativeDate(createdDate)} by {createdBy}
          </small>
        </div>
      </div>
      {!userQuery.isLoading && assignee && (
        <a href="/">
          <img
            className="assigned-to"
            src={userQuery.data.profilePictureUrl}
            alt="Assignee Avatar"
          />
        </a>
      )}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment />
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  )
}
