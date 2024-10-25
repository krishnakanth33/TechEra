import Loader from 'react-loader-spinner'

import {Component} from 'react'

import './index.css'

import TechItems from '../TechItems'

const apiStatusContent = {
  inprogress: 'PROGRESS',
  success: 'SUCCESS',
  failur: 'FAILUR',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {techList: [], apiStatus: apiStatusContent.initial}

  componentDidMount() {
    this.getTechlist()
  }

  getTechlist = async () => {
    this.setState({apiStatus: apiStatusContent.inprogress})
    const response = await fetch('https://apis.ccbp.in/te/courses')

    if (response.ok) {
      const data = await response.json()

      const updateData = data.courses.map(eachItem => ({
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
        name: eachItem.name,
      }))

      this.setState({techList: updateData, apiStatus: apiStatusContent.success})
    } else {
      this.setState({apiStatus: apiStatusContent.failur})
    }
  }

  renderTechs = () => {
    const {techList} = this.state
    return (
      <div>
        <h1 className="main-heading">Courses</h1>
        <ul className="techList-container">
          {techList.map(eachItem => (
            <TechItems techItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" width={80} height={30} />
    </div>
  )

  retryrequest = () => {
    this.getTechlist()
  }

  renderFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.retryrequest}
      >
        Retry
      </button>
    </>
  )

  returnResponse = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContent.success:
        return this.renderTechs()

      case apiStatusContent.inprogress:
        return this.renderLoader()

      case apiStatusContent.failur:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return <div className="home-container">{this.returnResponse()}</div>
  }
}

export default Home
