import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'
import './index.css'

const statusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    responseStatus: statusConst.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    const {params} = match
    const {id} = params

    if (id !== prevProps.match.params.id) {
      this.getJobItemDetails()
    }
  }

  getJobItemDetails = async () => {
    this.setState({responseStatus: statusConst.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jobDetails = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobDetails, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccess(data)
    } else {
      this.setState({responseStatus: statusConst.failure})
    }
  }

  onSuccess = data => {
    const updatedData = {
      jobDetails: {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      },
      similarJobs: data.similar_jobs.map(eachSimilar => ({
        companyLogoUrl: eachSimilar.company_logo_url,
        employmentType: eachSimilar.employment_type,
        id: eachSimilar.id,
        jobDescription: eachSimilar.job_description,
        location: eachSimilar.location,
        rating: eachSimilar.rating,
        title: eachSimilar.title,
      })),
    }

    this.setState({
      jobItemDetails: updatedData,
      responseStatus: statusConst.success,
    })
  }

  renderLoader = () => (
    <div
      className="loader-container job-item-details-loader"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container-lg">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="went-wrong-text">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {jobItemDetails} = this.state
    const {jobDetails, similarJobs} = jobItemDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-details-responsive-container">
        <div className="job-item-details-container">
          <div className="logo-title-star-container">
            <img
              className="company-logo-details company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-star-container">
              <h1 className="heading-300 title-details">{title}</h1>
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
                <p className="para-100">{location}</p>
              </div>
              <div className="job-type-container">
                <BsFillBriefcaseFill className="icon-100" />
                <p className="para-100">{employmentType}</p>
              </div>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>

          <hr className="ruler" />

          <div className="description-heading-visit-container">
            <h1 className="heading-250 description-heading">Description</h1>
            <a className="visit-link-container" href={companyWebsiteUrl}>
              <p className="visit-text">Visit</p>
              <HiOutlineExternalLink className="visit-link-icon" />
            </a>
          </div>
          <p className="para-150 job-desc">{jobDescription}</p>

          <h1 className="skills">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <li className="skill-item" key={eachSkill.name}>
                <img
                  className="skill-img"
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="heading-200 life-at-company-heading">
            Life at Company
          </h1>
          <div className="life-at-company-container">
            <p className="para-150 life-at-company-para">
              {lifeAtCompany.description}
            </p>
            <img
              className="life-at-company-img"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>

        <h1 className="heading-300 similar-jobs">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachJob => (
            <SimilarJobsCard key={eachJob.id} similarJobsItem={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderView = () => {
    const {responseStatus} = this.state

    switch (responseStatus) {
      case statusConst.inProgress:
        return this.renderLoader()
      case statusConst.success:
        return this.renderJobItemDetails()
      case statusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-bg-container">
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default JobItemDetails
