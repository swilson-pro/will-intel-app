import { Link } from 'react-router-dom'
import './Style/NavBar.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faUser, faBuilding, faBusinessTime } from '@fortawesome/free-solid-svg-icons'
import {faYoutube, faGithub} from '@fortawesome/free-brands-svg-icons'

const NavBar = () => {
    return (
        <div className='header'>
            <div className='header_left'>
                <h1 className='logo'>Carlson</h1>
                <div className='header_search'>
                    <i className='materials-icons'></i>
                    <FontAwesomeIcon className='materials-icons' icon={faSearch}></FontAwesomeIcon>
                    {/* <i className="fa-solid fa-user"></i> */}
                    <input type='text' />
                    {/* <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon> */}
                    {/* <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon> */}

                </div>
            </div>
            <div className='header_right'>
                <Link className='link' to='/'>
                    <div className='headerOption'>
                        {/* <i className='material-icons headerOption_icon'></i> */}
                        
                        <FontAwesomeIcon className='materials-icons headerOption_icon' icon={faHome}></FontAwesomeIcon>
                        <h3>Home</h3>
                    </div>
                </Link>
                <Link className='link' to='/contacts'>
                    <div className='headerOption'>
                        {/* <i className='material-icons headerOption_icon'></i> */}
                        <FontAwesomeIcon className='materials-icons headerOption_icon' icon={faUser}></FontAwesomeIcon>
                        <h3>Contacts</h3>
                    </div>
                </Link>
                <Link className='link' to='/companies'>
                    <div className='headerOption'>
                        {/* <i className='material-icons headerOption_icon'></i> */}
                        <FontAwesomeIcon className='materials-icons headerOption_icon' icon={faBuilding}></FontAwesomeIcon>
                        <h3>Companies</h3>
                    </div>
                </Link>
                <Link className='link' to='/products'>
                    <div className='headerOption'>
                        {/* <i className='material-icons headerOption_icon'></i> */}
                        <FontAwesomeIcon className='materials-icons headerOption_icon' icon={faBusinessTime}></FontAwesomeIcon>
                        <h3>Products</h3>
                    </div>
                </Link>
            </div>
            

        </div>


        // <div className='navbar'>
        //     <ul className='nav-links'>
        //         <li className='nav-item' id='nav-company-name'>
        //             Carlson
        //         </li>
        //         <li className='nav-item'>
        //             <Link to='/'>Home</Link>
        //         </li>
        //         <li className='nav-item'>
        //             <Link to='/contacts'>Contacts</Link>
        //         </li>
        //         <li className='nav-item'>
        //             <Link to='/companies'>Companies</Link>
        //         </li>
        //         <li className='nav-item'>
        //             <Link to='/products'>Products</Link>
        //         </li>
        //         <li className='nav-item'>
        //             <Link to='/initiatives'>Initiatives</Link>
        //         </li>
        //     </ul>
        // </div>
    )
}

export default NavBar