import { Link } from 'react-router-dom'
import './Style/NavBar.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-brands-svg-icons'

const NavBar = () => {
    return (
        <div className='header'>
            <div className='header_left'>
                <h1 className='logo'>Carlson</h1>
                <div className='header_search'>
                    <i className='materials-icons'>search</i>
                    <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>
                    <i className="fa-solid fa-user"></i>
                    <input type='text' />
                </div>
            </div>
            <div className='header_right'>
                <div className='headerOption'>
                    <i className='material-icons headerOption_icon'></i>
                    <h3>Contacts</h3>
                </div>
                <div className='headerOption'>
                    <i className='material-icons headerOption_icon'></i>
                    <h3>Companies</h3>
                </div>
                <div className='headerOption'>
                    <i className='material-icons headerOption_icon'></i>
                    <h3>Products</h3>
                </div>
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