import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditContact from "./EditContact"
import './ContactCard.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faEraser, faUserPen, faBuilding } from '@fortawesome/free-solid-svg-icons'
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

    // contact.notes.map((note) => {
    //     console.log('note', note)
    //     console.log('note.content', note.content)
    //     console.log('note.id', note.id)
    // })

    return (
        <div className="contact-card">
            <button type="button" className="delete-contact" onClick={() => deleteContact(contact.id)}>
                <span className="button_icon">
                    <FontAwesomeIcon icon={faEraser}></FontAwesomeIcon>
                </span>
                <span className="button_text">Delete</span>
            </button>
            <button type="button" className="update-contact" onClick={updateContact}>
                <span className="button_icon">
                    <FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon>
                </span>
                <span className="button_text">Update</span>
            </button>
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
                    <form className="note-form">
                        <button className="note-button">Add Note</button>
                        <textarea placeholder="write note" className="new-note" />
                    </form>
                    <h2>Notes</h2>
                    <hr></hr>
                    <ul className="notes">
                        <li>test note</li>
                        {/* {contact.notes?.map((note) => {
                            return <li className="note" key={note.id}>{note.content}</li>
                        })} */}
                        {contact.notes?.reverse().map((note) => {
                            return (
                                    <li className='note' key={note.id}>{`note created: ${note.created_at} by: ${note.user_id} ${note.content}`}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="pd-right">
                    <h3>Organization</h3>
                    <div className="pd-row">
                        <div className="company-name">
                            <span>
                                <FontAwesomeIcon className="span-icon" icon={faBuilding}></FontAwesomeIcon>
                            </span>
                            <span>
                                <p className="span-content" onClick={() => handleCompanyClick(contact.company_id)}>{contact.company_name}</p>
                            </span>
                        
                        </div>
                    
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