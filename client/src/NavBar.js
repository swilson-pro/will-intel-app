import { Link } from 'react-router-dom'
import './Style/NavBar.css'

const NavBar = () => {
    return (
        <div className='header'>
            <div className='header_left'>
                <h1>Carlson</h1>
            </div>
            <div className='header-right'>
                <div className='headerOption'>
                    <i className='material-icons headerOption_icon'></i>
                    <h3>Contacts</h3>
                </div>
                <div className='header-option'>
                    <i className='material-icons headerOption_icon'></i>
                    <h3>Companies</h3>
                </div>
                <div className='header-option'>
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