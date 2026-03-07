import React from 'react'
import { Link } from "react-router-dom"

const NavBar1 = () => {
  return (
    <section id="navBlock">
      <article>
        <div className='logo'>
          <h3>Weather</h3>
        </div>

        <div className='menuLink'>
          <Link to="/weather">Check Weather</Link>
        </div>
      </article>
    </section>
  )
}

export default NavBar1
