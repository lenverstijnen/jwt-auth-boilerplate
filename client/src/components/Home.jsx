import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Home = () => {
  const { user } = useContext(AppContext).state
  return (
    <div>
      <h1>Welcome {user && user.name} </h1>
      {user && user.isAdmin ? <h2>{user.name} is een administrator</h2> : null}
      <Link to="/logout">Uitloggen</Link>
    </div>
  )
}

export default Home
