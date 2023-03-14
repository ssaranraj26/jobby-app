import './index.css'
import JobListItem from '../JobListItem'

const JobsList = props => {
  const {jobsList} = props

  return (
    <ul className="jobs-list-container">
      {jobsList.map(eachJob => (
        <JobListItem key={eachJob.id} jobListItem={eachJob} />
      ))}
    </ul>
  )
}

export default JobsList
