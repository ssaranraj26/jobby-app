import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobsCard = props => {
  const {similarJobsItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsItem

  return (
    <Link to={`/jobs/${id}`} className="nav-links">
      <li className="job-list-item" id="similarJobListItem">
        <div className="logo-title-star-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="title-star-container">
            <h1 className="heading-300">{title}</h1>
            <div className="star-container">
              <AiFillStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>

        <h1 className="heading-250">Description</h1>
        <p className="para-150 m-5">{jobDescription}</p>

        <div className="location-job-type-container">
          <div className="location-container">
            <MdLocationOn className="icon-100" />
            <p className="para-100">{location}</p>
          </div>
          <div className="job-type-container">
            <BsFillBriefcaseFill className="icon-100" />
            <p className="para-100">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobsCard
