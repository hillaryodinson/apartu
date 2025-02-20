import { Link } from "react-router-dom"

const HomePage = () => {
  return (
   <>
    <div>Home Page</div>
    <Link to="/login">Login</Link> {" "} | {" "}
    <Link to="/signup">Sign Up</Link>
    </>
  )
}

export default HomePage