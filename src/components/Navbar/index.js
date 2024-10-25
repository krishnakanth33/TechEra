import {Link} from 'react-router-dom'

import './index.css'

const Navbar = () => (
  <Link to="/">
    <nav className="nav-container">
      <img
        className="img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </nav>
  </Link>
)

export default Navbar
