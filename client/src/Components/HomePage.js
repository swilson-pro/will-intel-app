import { useEffect, useState } from "react"
import ContactsPage from "./Contact/ContactsPage"
import {useSelector} from 'react-redux'

import { useNavigate } from "react-router-dom"


const HomePage = () => {
    const user = useSelector((state) => state.user);

    let navigate = useNavigate()

    // console.log('user', user)

    const [contactCount, setContactCount] = useState()
    const [companyCount, setCompanyCount] = useState()
    const [productCount, setProductCount] = useState()
    const [noteCount, setNoteCount] = useState()
    const [userCount, setUserCount] = useState()

    const getContactsCount = async () => {
        const res = await fetch(`http://localhost:3000/api/count_contacts`)
        const count = await res.json()
        setContactCount(count)
    }

    const getCompaniesCount = async () => {
        const res = await fetch(`http://localhost:3000/api/count_companies`)
        const count = await res.json()
        setCompanyCount(count)
    }

    const getProductsCount = async () => {
        const res = await fetch(`http://localhost:3000/api/count_products`)
        const count = await res.json()
        setProductCount(count)
    }

    const getNotesCount = async () => {
        const res = await fetch(`http://localhost:3000/api/count_notes`)
        const count = await res.json()
        setNoteCount(count)
    }

    const getUsersCount = async () => {
        const res = await fetch(`http://localhost:3000/api/count_users`)
        const count = await res.json()
        setUserCount(count)
    }

    useEffect(() => {
        getContactsCount()
        getCompaniesCount()
        getProductsCount()
        getNotesCount()
        getUsersCount()
    }, [])

    // console.log('contactCount', contactCount)
    // console.log('userCount', userCount)

    return (
        <main>

            <div className="company-aggregates">
                <h3 className="user-stats">HomePage</h3>
                    <p className="user-stats">{user.profile.first_name} {user.profile.last_name}</p>
                    <p className="user-stats">Email: {user.profile.email} </p>
                <h3 className="user-stats">Company Stats</h3>
                    <p className='user-stats' onClick={() => navigate('/contacts')}>Contacts:  {contactCount}</p>
                    <p className='user-stats' onClick={() => navigate('/companies')}>Companies: {companyCount}</p>
                    <p className='user-stats' onClick={() => navigate('/products')}>Products: {productCount}</p>
                    <p className='user-stats not-available' >Notes: {noteCount}</p>
                    <p className='user-stats not-available' >Users: {userCount}</p>
            </div>
            {/* <div className="user-aggregates">
                <h3>User Stats</h3>
                    <h4>Contacts: {"value"}</h4>
                    <h4>Companies: {"value"}</h4>
                    <h4>Deals: {"value"}</h4>
                    <h4>Products: {"value"}</h4>
            </div> */}
        </main>
    )
}

export default HomePage