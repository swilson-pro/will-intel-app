import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditContact from "./EditContact"
import './ContactCard.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'

const ContactCard = () => {

    let navigate = useNavigate()

    let {id} = useParams()

    const [contact, setContact] = useState({})
    const [isEditClicked, setIsEditClicked] = useState(false)

    const fetchContact = async() => {
        const response = await fetch(`http://localhost:3000/contacts/${id}`)
        const contactObj = await response.json()
        console.log('contactObj', contactObj)
        setContact(contactObj)

    }

    useEffect(() => {
        fetchContact()
    }, [])

    const updateContact = async () => {
        setIsEditClicked(!isEditClicked)
    }

    const deleteContact = async (id) => {
        let req = await fetch(`http://localhost:3000/contacts/${id}`, {
            method: "DELETE",            
        })
        .then(alert("Contact Deleted"))
        backToContacts()
    }



    const backToContacts = () => {
        navigate(`/contacts`)
    }

    useEffect(() => {
        fetchContact()
    }, [])

    const handleCompanyClick = (id) => {
        navigate(`/companies/${id}`)
    }

    const handleProductClick = (id) => {
        navigate(`/products/${id}`)
    }

    const handleContactClick = (id) => {
        navigate(`/contacts/${id}`)
        window.location.reload()
    }

    // console.log('id', id)
    // console.log('contact', contact)
    // console.log('contact.company_products', contact.company_products)
    return (
        <div className="contact-card">
            <button onClick={() => deleteContact(contact.id)}>Delete Contact</button>
            <button onClick={updateContact}>Update Contact Details</button>
            <div className="profile-details">
                <div className="pd-left">
                    <div className="pd-row">
                        <div className="image-div">
                            <img className='pd-image' src={contact.image_url} alt={contact.name}></img>
                            <a className="materials-icons" href={contact.email}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></a>
                            <a className="materials-icons" href={contact.phone}><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon></a>
                            <a className="materials-icons" href={contact.linkedin_profile_url} target="_blank"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a>
                        </div>
                        <div>
                            <h3 className="contact-name">{contact.name}</h3>
                            <h4 className="contact-position">{contact.position}</h4>
                            <h4 className="contact-company" onClick={() => handleCompanyClick(contact.company_id)}>{contact.real_company_name}</h4>
                            <h4 className="company-id">Company ID: {contact.company_id}</h4>
                            
                        </div>
                        {/* <hr></hr> */}
                        <div className="left-body">
                            
                            {/* <h4>Email: {contact.email}</h4> */}
                            
                            {/* <h4>Phone: {contact.phone}</h4> */}
                            
                            <h4>Contact Owner: {contact.owner_name}</h4>
                            <h4>Contact Owner ID: {contact.user_id}</h4>
                            {/* <h4>Company: {contact.company_name}</h4> */}
                            {/* <h4>Position:{contact.position}</h4> */}
                            <details>
                                <summary>Bio</summary>
                                <p>Bio: {contact.bio}</p>  
                            </details>  
                        </div>
                        
                    </div>
                </div>
                <div className="pd-mid">
                    <h2>Notes</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</p>
                </div>
                <div className="pd-right">
                    <h3>Organization</h3>
                    <div className="pd-row">
                        <img onClick={() => handleCompanyClick(contact.company_id)} className="contact-company-logo" src={contact.company_logo} alt={contact.real_company_name}></img>

                                <details className="company-products">
                                    <summary>Company Products</summary>
                
                                    {contact.company_products?.map((product) => {
                                        return (
                                            <li key={product.id} onClick={() => handleProductClick(product.id)}>{product.name}</li>
                                        )
                                    })}
                                </details>
                                <details className="colleagues">
                                    <summary>Colleagues</summary>
                                    {contact.company_contacts?.filter(colleague => colleague.name !== contact.name).map(filteredColleague => {
                                        return (
                                            <li key={filteredColleague.id} onClick={() => handleContactClick(filteredColleague.id)}>{filteredColleague.name}</li>
                                        )
                                        })}
                                </details>


                    </div>
                </div>
            </div>
            {isEditClicked ? <EditContact contact={contact} id={id} fetchContact={fetchContact} /> : null}
        </div>
    )
}

export default ContactCard