import { NavLink } from "react-router-dom"
import './Header.css'
const Header = () => {
return (
  <>
  
  <nav id="navbar">

    <ul>
     
      <li className="item">
        <NavLink to='/home'>Home</NavLink>
      </li>
      <li className="item">
        <NavLink to='/File'>File</NavLink>
      </li>
      <li className="item">
        <NavLink to='/Archive'>Archive</NavLink>
      </li>
      <li className="item">
        <NavLink to='/Help'>Help</NavLink>
      </li>
      
      </ul>

    
  </nav>
  </>
)
}

export default Header
