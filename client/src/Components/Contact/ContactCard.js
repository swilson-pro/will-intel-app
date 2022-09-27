import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditContact from "./EditContact"

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

    // console.log('id', id)
    // console.log('contact', contact)
    // console.log('contact.company_products', contact.company_products)
    return (
        <div className="contact-card">
            <button onClick={() => deleteContact(contact.id)}>Delete Contact</button>
            <button onClick={updateContact}>Update Contact Details</button>
            <div className="main">
                <div className="left">
                    <div className="left-head">
                        <img src={contact.image_url} width='100' height='100'></img>
                        <h2>{contact.name}</h2>
                        <h3>{contact.position}</h3>
                        <h4 onClick={() => handleCompanyClick(contact.company_id)}>{contact.real_company_name}</h4>

                        <h4>Company ID: {contact.company_id}</h4>
                        
                    </div>
                    <hr></hr>
                    <div className="left-body">
                        <h4>Email: {contact.email}</h4>
                        <h4>Phone: {contact.phone}</h4>
                        <h4>Contact Owner: {contact.owner_name}</h4>
                        <h4>Contact Owner ID: {contact.user_id}</h4>
                        <h4>Last Note: </h4>
                        {/* <h4>Company: {contact.company_name}</h4> */}
                        {/* <h4>Position:{contact.position}</h4> */}
                        <h4>Linkedin: {<a href={contact.linkedin_profile_url} target="_blank">{contact.linkedin_profile_url}</a>}</h4>
                        <h4>Bio: {contact.bio}</h4>
                    </div>
                    <div className="left-bottom">
                        <ul className="company-products">
         
                            {contact.company_products?.map((product) => {
                                return (
                                    <li key={product.id} onClick={() => handleProductClick(product.id)}>{product.name}</li>
                                )
                            })}
                            <li>Name</li>
                        </ul>
                        <img className="contact-company-logo" src={contact.company_logo} alt={contact.real_company_name}></img>
                    </div>
                </div>
            </div>
            <hr></hr>
            {isEditClicked ? <EditContact contact={contact} id={id} fetchContact={fetchContact} /> : null}
        </div>
    )
}

export default ContactCard