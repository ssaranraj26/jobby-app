import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/" className="nav-links logo-link">
        <img
          className="header-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <nav className="nav-container-lg">
        <ul className="nav-item-container-lg">
          <Link to="/" className="nav-links">
            <li className="nav-item-lg">Home</li>
          </Link>
          <Link to="/jobs" className="nav-links">
            <li className="nav-item-lg">Jobs</li>
          </Link>
        </ul>
      </nav>
      <button className="logout-btn-lg" type="button" onClick={onLogout}>
        Logout
      </button>

      <nav className="nav-container-sm">
        <ul className="nav-item-container-sm">
          <Link to="/" className="nav-links">
            <li className="nav-item-sm">
              <AiFillHome className="nav-icons" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-links">
            <li className="nav-item-sm">
              <BsFillBriefcaseFill className="nav-icons" />
            </li>
          </Link>
          <li>
            <button className="logout-btn-sm" type="button" onClick={onLogout}>
              <FiLogOut className="nav-icons" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default withRouter(Header)
