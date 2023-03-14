import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginFailure: false,
    errorMsg: '',
    isLoading: false,
  }

  onLoginSuccess = data => {
    this.setState({loginFailure: false, errorMsg: '', isLoading: false})
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = data => {
    const errorMsg = data.error_msg
    this.setState({loginFailure: true, errorMsg, isLoading: false})
  }

  submitForm = async e => {
    this.setState({isLoading: true})
    e.preventDefault()
    let {username, password} = this.state

    if (username === 'saran' && password === 'saran@123') {
      username = 'rahul'
      password = 'rahul@2021'
    }
    const credential = {username, password}

    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(credential),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.onLoginSuccess(data)
    } else {
      this.onLoginFailure(data)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <div className="input-field">
        <label htmlFor="username" className="labels">
          USERNAME
        </label>
        <input
          id="username"
          className="inputs"
          type="text"
          placeholder="saran"
          value={username}
          onChange={v => this.setState({username: v.target.value})}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <div className="input-field">
        <label htmlFor="password" className="labels">
          PASSWORD
        </label>
        <input
          id="password"
          className="inputs"
          type="password"
          placeholder="saran@123"
          value={password}
          onChange={e => this.setState({password: e.target.value})}
        />
      </div>
    )
  }

  renderErrMsg = () => {
    const {loginFailure, errorMsg} = this.state

    return loginFailure && <p className="login-err-msg">*{errorMsg}</p>
  }

  render() {
    const {isLoading} = this.state

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card">
          <img
            className="jobby-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <div className="loader-container" id="loginLoader">
                  <Loader
                    type="BallTriangle"
                    color="blue"
                    height="20"
                    width="20"
                  />
                </div>
              ) : (
                'Login'
              )}
            </button>
            {this.renderErrMsg()}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
