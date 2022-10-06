import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state) => state.user).profile;

    let navigate = useNavigate()

    console.log('user', user)

    const [contactCount, setContactCount] = useState()
    const [userContactCount, setUserContactCount] = useState()
    const [companyCount, setCompanyCount] = useState()
    const [userCompanyCount, setUserCompanyCount] = useState()
    const [productCount, setProductCount] = useState()
    const [userProductCount, setUserProductCount] = useState()
    const [noteCount, setNoteCount] = useState()
    const [userNoteCount, setUserNoteCount] = useState()
    const [userCount, setUserCount] = useState()

    const getContactsCount = async () => {
        const res = await fetch(`http://localhost:3000/count_contacts`)
        const count = await res.json()
        setContactCount(count)
    }

    const getUserContactsCount = async () => {
        const res = await fetch(`http://localhost:3000/usercontactscount/${user.id}`)
        const count = await res.json()
        setUserContactCount(count)
    }

    const getCompaniesCount = async () => {
        const res = await fetch(`http://localhost:3000/count_companies`)
        const count = await res.json()
        setCompanyCount(count)
    }

    const getUserCompaniesCount = async () => {
        const res = await fetch(`http://localhost:3000/usercompaniescount/${user.id}`)
        const count = await res.json()
        setUserCompanyCount(count)
    }

    const getProductsCount = async () => {
        const res = await fetch(`http://localhost:3000/count_products`)
        const count = await res.json()
        setProductCount(count)
    }

    const getUserProductsCount = async () => {
        const res = await fetch(`http://localhost:3000/userproductscount/${user.id}`)
        const count = await res.json()
        setUserProductCount(count)
    }

    const getNotesCount = async () => {
        const res = await fetch(`http://localhost:3000/count_notes`)
        const count = await res.json()
        setNoteCount(count)
    }

    const getUserNotesCount = async () => {
        const res = await fetch(`http://localhost:3000/usernotescount/${user.id}`)
        const count = await res.json()
        setUserNoteCount(count)
    }

    

    useEffect(() => {
        getContactsCount()
        getUserContactsCount()
        getCompaniesCount()
        getUserCompaniesCount()
        getProductsCount()
        getUserProductsCount()
        getNotesCount()
        getNotesCount()
        getUserNotesCount()
    }, [])

    return (
        <div className="card">
            <h5 className="card-header">User</h5>
            <div className="profile-details">
                <div className="pd-left">
                    <div className="image-div">
                        {!user.image ?
                            <img className='pd-image' src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`} alt={user.last_name}></img>
                            : <img className='pd-image' src={user.image} onError={(e) => (e.currentTarget.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')} alt={user.last_name}></img>}
                        <div className="a-tag-div">
                        </div>
                    </div>
                    <div className="general-info">
                        <h3>{user.first_name} {user.last_name}</h3>
                        <h4>Role: N/A</h4>
                        <h4 className="contact-company">Company: N/A</h4>
                        <h4>Manager: N/A</h4>
                        <p className="user-stats">{user.first_name} {user.last_name}</p>
                            <p className="user-stats">{user.email} </p>
                    </div>
                </div>
                <div className="profile-mid">
                    <div className="pd-row">
                    <h3 className="general-info">User Details</h3>
                        <div className="company-aggregates">
                            <p className='user-stats' onClick={() => navigate('/contacts')}>Contacts:  {userContactCount}</p>
                            <p className='user-stats' onClick={() => navigate('/companies')}>Companies: {userCompanyCount}</p>
                            <p className='user-stats' onClick={() => navigate('/products')}>Products: {userProductCount}</p>
                            <p className='user-stats not-available' >Notes: {userNoteCount}</p>
                        </div>
                    </div>
                </div>
                <div className="profile-right">
                    <div className="pd-row">
                    <h3 className="general-info">Organizational Details</h3>
                        <div className="company-aggregates">
                            <p className='user-stats' onClick={() => navigate('/contacts')}>Contacts:  {contactCount}</p>
                            <p className='user-stats' onClick={() => navigate('/companies')}>Companies: {companyCount}</p>
                            <p className='user-stats' onClick={() => navigate('/products')}>Products: {productCount}</p>
                            <p className='user-stats not-available' >Notes: {noteCount}</p>
                            <p className='user-stats not-available' >Users: {userCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email} </p>
        </div>
    )
}

export default Profile