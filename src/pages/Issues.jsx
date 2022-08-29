import { useState } from 'react'
import IssuesList from '../components/IssuesList'
import LabelList from '../components/LabelList'
import { StatusSelect } from '../components/StatusSelect'

export default function Issues() {
  const [labels, setLabels] = useState([])
  const [status, setStatus] = useState('')

  return (
    <div>
      <main>
        <section>
          <IssuesList labels={labels} status={status} />
        </section>
        <aside>
          <LabelList
            selected={labels}
            toggle={(label) =>
              setLabels((labels) =>
                labels.includes(label)
                  ? labels.filter((current) => current !== label)
                  : labels.concat(label)
              )
            }
          />
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
        </aside>
      </main>
    </div>
  )
}
