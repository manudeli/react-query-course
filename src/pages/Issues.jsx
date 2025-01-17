import { useState } from 'react'
import { Link } from 'react-router-dom'
import IssuesList from '../components/IssuesList'
import LabelList from '../components/LabelList'
import { StatusSelect } from '../components/StatusSelect'

export default function Issues() {
  const [labels, setLabels] = useState([])
  const [status, setStatus] = useState('')
  const [pageNum, setPageNum] = useState(1)

  return (
    <div>
      <main>
        <section>
          <IssuesList
            labels={labels}
            status={status}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        </section>
        <aside>
          <LabelList
            selected={labels}
            toggle={(label) =>
              setLabels((labels) => {
                labels.includes(label)
                  ? labels.filter((current) => current !== label)
                  : labels.concat(label)
                setPageNum(1)
              })
            }
          />
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
          <hr />
          <Link className="button" to="/add">
            Add Issue
          </Link>
        </aside>
      </main>
    </div>
  )
}
