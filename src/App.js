import {Route, Switch} from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import NotFound from './components/NotFound'
import CourseDetails from './components/CourseDetails'

// Replace your code here
const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/courses/:id" component={CourseDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
