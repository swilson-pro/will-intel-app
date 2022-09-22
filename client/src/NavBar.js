import { Link } from 'react-router-dom'
import styles from './Style/NavBar.css'

const NavBar = () => {
    return (
        <div className='navbar'>
            <ul className='nav-links'>
                <li className='nav-item' id='nav-company-name'>
                    Carlson
                </li>
                <li className='nav-item'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/contacts'>Contacts</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/companies'>Companies</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/products'>Products</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/initiatives'>Initiatives</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar