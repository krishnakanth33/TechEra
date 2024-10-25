import Loader from 'react-loader-spinner'

import {Component} from 'react'

import './index.css'

const apiStatusconditions = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusconditions.initial}

  componentDidMount() {
    this.getcourseDetails()
  }

  getcourseDetails = async () => {
    this.setState({apiStatus: apiStatusconditions.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

    if (response.ok) {
      const data = await response.json()
      const courseData = data.course_details

      const updatedCourseData = {
        id: courseData.id,
        name: courseData.name,
        imageUrl: courseData.image_url,
        description: courseData.description,
      }

      this.setState({
        courseDetails: updatedCourseData,
        apiStatus: apiStatusconditions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusconditions.failure})
    }
  }

  renderDetails = () => {
    const {courseDetails} = this.state
    const {name, description, imageUrl} = courseDetails

    return (
      <div className="container">
        <img className="course-img" src={imageUrl} alt={name} />
        <div>
          <h1 className="course-name">{name}</h1>
          <p className="course-des">{description}</p>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" width={80} height={30} />
    </div>
  )

  retryrequest = () => {
    this.getcourseDetails()
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
      case apiStatusconditions.success:
        return this.renderDetails()

      case apiStatusconditions.progress:
        return this.renderLoader()

      case apiStatusconditions.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return <div className="bg-container">{this.returnResponse()}</div>
  }
}

export default CourseDetails
