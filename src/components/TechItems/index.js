import {Link} from 'react-router-dom'
import './index.css'

const TechItems = props => {
  const {techItem} = props
  const {name, logoUrl, id} = techItem

  return (
    <Link to={`/courses/${id}`} className="courses-link">
      <li className="listItem">
        <img className="logo" src={logoUrl} alt={name} />
        <p className="heading">{name}</p>
      </li>
    </Link>
  )
}

export default TechItems
