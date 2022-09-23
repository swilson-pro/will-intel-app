import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const ContactCard = () => {

    let {id} = useParams()

    const [contact, setContact] = useState({})

    const fetchContact = async() => {
        const response = await fetch(`http://localhost:3000/contacts/${id}`)
        const contactObj = await response.json()
        setContact(contactObj)

    }

    useEffect(() => {
        fetchContact()
    }, [])

    console.log('id', id)
    console.log('contact', contact)
    return (
        <div className="contact-card">
            <div className="main">
                <div className="left">
                    <div className="left-head">
                        <img src={contact.image_url} width='100' height='100'></img>
                        <h2>{contact.name}</h2>
                        <h3>{contact.position}</h3>
                        <h4>{contact.company_name}</h4>
                        
                    </div>
                    <hr></hr>
                    <div className="left-body">
                        <h4>Email: {contact.email}</h4>
                        <h4>Phone: {contact.phone}</h4>
                        <h4>Contact Owner: {contact.owner_name}</h4>
                        <h4>Last Note: </h4>
                        {/* <h4>Company: {contact.company_name}</h4> */}
                        {/* <h4>Position:{contact.position}</h4> */}
                        <h4>Linkedin: {<a href={contact.linkedin_profile_url} target="_blank">{contact.linkedin_profile_url}</a>}</h4>
                        <h4>Bio: {contact.bio}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactCard