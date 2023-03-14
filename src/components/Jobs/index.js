import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'
import Header from '../Header'
import JobsList from '../JobsList'
import FilterJobs from '../FilterJobs'
import UserProfile from '../UserProfile'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const statusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    search: '',
    employmentType: [],
    activeSalaryRangeId: '',
    responseStatus: statusConst.initial,
    hamBurgerExpanded: false,
  }

  componentDidMount() {
    this.setState(
      {
        employmentType: employmentTypesList.map(eachType => ({
          ...eachType,
          isChecked: false,
        })),
      },
      this.getJobsList,
    )
  }

  getJobsList = async () => {
    this.setState({responseStatus: statusConst.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {search, employmentType, activeSalaryRangeId} = this.state

    const employmentTypeStr = employmentType
      .filter(eachType => eachType.isChecked)
      .map(eachType => eachType.employmentTypeId)
      .join()

    const jobsApi = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeStr}&minimum_package=${activeSalaryRangeId}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsApi, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccess(data)
    } else {
      this.setState({responseStatus: statusConst.failure})
    }
  }

  onSuccess = data => {
    const updatedData = data.jobs.map(eachData => ({
      companyLogoUrl: eachData.company_logo_url,
      employmentType: eachData.employment_type,
      id: eachData.id,
      jobDescription: eachData.job_description,
      location: eachData.location,
      packagePerAnnum: eachData.package_per_annum,
      rating: eachData.rating,
      title: eachData.title,
    }))

    this.setState({jobsList: updatedData, responseStatus: statusConst.success})
  }

  renderSearchField = screenType => {
    const {search} = this.state

    return (
      <div className={`search-field-container ${screenType}`}>
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          value={search}
          onChange={e => this.setState({search: e.target.value})}
          onKeyDown={e => e.key === 'Enter' && this.getJobsList()}
        />
        <button
          className="search-btn"
          type="button"
          data-testid="searchButton"
          onClick={() => this.getJobsList()}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            className="no-jobs-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-para">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return <JobsList jobsList={jobsList} />
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="went-wrong-text">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  renderJobsView = () => {
    const {responseStatus} = this.state

    switch (responseStatus) {
      case statusConst.inProgress:
        return this.renderLoader()
      case statusConst.success:
        return this.renderJobsList()
      case statusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  //   Child component functions

  handleCheckBox = id => {
    this.setState(
      prevState => ({
        employmentType: prevState.employmentType.map(eachType => {
          if (id === eachType.employmentTypeId) {
            return {
              ...eachType,
              isChecked: !eachType.isChecked,
            }
          }
          return {...eachType}
        }),
      }),
      this.getJobsList,
    )
  }

  handleRadio = id => {
    this.setState({activeSalaryRangeId: id}, this.getJobsList)
  }

  //   Utility function
  toggleMenu = () =>
    this.setState(prevState => ({
      hamBurgerExpanded: !prevState.hamBurgerExpanded,
    }))

  render() {
    const {employmentType, activeSalaryRangeId, hamBurgerExpanded} = this.state
    const HamBurgerClass = hamBurgerExpanded ? 'expand-menu' : ''
    const hamClass = hamBurgerExpanded ? 'display-none' : ''
    const closeClass = !hamBurgerExpanded ? 'display-none' : ''

    return (
      <div className="jobs-bg-container">
        <button
          className={`hamburger-btn ${hamClass}`}
          type="button"
          onClick={this.toggleMenu}
        >
          <GiHamburgerMenu className="hamburger-icon" />
        </button>
        <button
          className={`close-btn ${closeClass}`}
          type="button"
          onClick={this.toggleMenu}
        >
          <AiOutlineClose className="close-icon" />
        </button>
        <Header
          hamBurgerExpanded={hamBurgerExpanded}
          toggleMenu={this.toggleMenu}
        />
        <div className="jobs-responsive-container">
          <div className={`jobs-side-bar-container ${HamBurgerClass}`}>
            <UserProfile />
            <FilterJobs
              employmentType={employmentType}
              handleCheckBox={this.handleCheckBox}
              activeSalaryRangeId={activeSalaryRangeId}
              handleRadio={this.handleRadio}
            />
          </div>
          <div className="jobs-main-section">
            {this.renderSearchField('search-lg')}
            {this.renderJobsView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
