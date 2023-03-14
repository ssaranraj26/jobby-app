import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

const statusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class UserProfile extends Component {
  state = {userProfile: {}, responseStatus: statusConst.initial}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({responseStatus: statusConst.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const userProfileApi = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userProfileApi, options)
    const data = await response.json()

    if (response.ok) {
      this.onRequestSuccess(data)
    } else {
      this.setState({responseStatus: statusConst.failure})
    }
  }

  onRequestSuccess = data => {
    const updatedProfileDetails = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    this.setState({
      userProfile: updatedProfileDetails,
      responseStatus: statusConst.success,
    })
  }

  renderUserProfile = () => {
    const {userProfile} = this.state

    return (
      <div className="user-profile-card">
        <img
          className="profile-avatar"
          src={userProfile.profileImageUrl}
          alt="profile"
        />
        <h1 className="heading-150 user-profile-name">Saranraj</h1>
        <p className="short-bio">MERN Full-Stack Developer</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failed-profile-container">
      <button className="retry-btn" type="button" onClick={this.getUserProfile}>
        Retry
      </button>
    </div>
  )

  renderProfileView = () => {
    const {responseStatus} = this.state

    switch (responseStatus) {
      case statusConst.inProgress:
        return this.renderLoader()
      case statusConst.success:
        return this.renderUserProfile()
      case statusConst.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderProfileView()
  }
}

export default UserProfile
