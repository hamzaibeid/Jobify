import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'
import {Link} from 'react-router-dom'
 const Landing = () => {
  return (
    <Wrapper>
        <nav> 
           <Logo/>
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>  
                Job <span>tracking</span> app 
                </h1>
                <p>
                    Eu duis veniam anim culpa. Labore minim ut sit laborum eu sit. Excepteur est consectetur est voluptate. Do magna enim commodo ad esse excepteur nostrud esse proident qui. Incididunt irure officia esse elit irure cupidatat est commodo ipsum in reprehenderit est elit. Culpa anim excepteur dolor irure amet occaecat eiusmod quis sit incididunt.
                </p>
                <Link to = '/register' className = "btn btn-hero">Login/Register</Link>
            </div>
            <img src={main} alt="job hunt" className = "img main-img"/>
        </div>
    </Wrapper>
  )
}
export default Landing;