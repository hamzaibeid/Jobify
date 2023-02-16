import {Link} from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

export const Error = () => {
  return (
    <Wrapper className="full-page">
        <div>
            <img src={img} alt="not found" className="not-found-img"/>
            <h3>ohh! Page not found</h3>
            <p>We can't seem to find the page you're looking for</p>
            <Link to="/">Back to Home</Link>
        </div>
    </Wrapper>
  )
}
export default Error