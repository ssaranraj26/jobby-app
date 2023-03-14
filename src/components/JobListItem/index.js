import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobListItem = props => {
  const {jobListItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobListItem

  return (
    <Link to={`/jobs/${id}`} className="nav-links">
      <li className="job-list-item">
        <div className="logo-title-star-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="title-star-container">
            <h1 className="heading-300 title">{title}</h1>
            <div className="star-container">
              <AiFillStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-job-type-package-container">
          <div className="location-job-type-container">
            <div className="location-container">
              <MdLocationOn className="icon-100" />
              <p className="para-100 location">{location}</p>
            </div>
            <div className="job-type-container">
              <BsFillBriefcaseFill className="icon-100" />
              <p className="para-100 employment-type">{employmentType}</p>
            </div>
          </div>
          <h1 className="package-text">{packagePerAnnum}</h1>
        </div>

        <hr className="ruler" />

        <h1 className="heading-250 description">Description</h1>
        <p className="para-150 job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobListItem
