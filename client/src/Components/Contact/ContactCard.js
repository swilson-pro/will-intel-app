import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditContact from "./EditContact"
import './ContactCard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faEraser, faUserPen, faBuilding, faPencil } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

import {Visible, Unvisible, Others, UserBadge, Plus, Calendar, Trash, Edit } from '@rsuite/icons'

import BioModal from "./BioModal"

import Moment from 'moment';

import { useSelector } from 'react-redux'

import { Form, Input, Button, IconButton, ButtonToolbar, SelectPicker, Popover, Whisper } from 'rsuite'
import { useRef, forwardRef } from "react"
import { SchemaModel, StringType } from "schema-typed"

import ProductsDrawer from "../Product/ProductsDrawer"
import ContactsDrawer from "./ContactsDrawer"

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const ContactCard = () => {

    const user = useSelector((state) => state.user).profile;

    const formRef = useRef()

    console.log('user', user)

    let navigate = useNavigate()

    let { id } = useParams()

    const [contact, setContact] = useState({})
    const [isEditClicked, setIsEditClicked] = useState(false)

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")

    const fetchContact = async () => {
        const response = await fetch(`http://localhost:3000/contacts/${id}`)
        const contactObj = await response.json()
        console.log('contactObj', contactObj)
        setContact(contactObj)
        let reverseOrderNotes = contactObj.notes.reverse()
        setNotes(reverseOrderNotes)

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
        window.location.reload(false)
    }

    const handleAddNote = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: newNote,
                notable_id: contact.id,
                notable_type: "Contact",
                user_id: user.id

            })
        })
        fetchContact()
        setNewNote("")
    }

    console.log('contact.notes', contact.notes)

    const [formValue, setFormValue] = useState({
        textarea: ""
    })

    const model = SchemaModel({
        textarea: StringType().isRequired("Note must have content.")
    })

    const formClick = async () => {
        if (!formRef.current.check()) {
            console.error("FORM ERROR!");
            return;
        }
        console.log('formValue', formValue)
        let req = await fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: formValue.textarea,
                notable_id: contact.id,
                notable_type: "Contact",
                user_id: user.id

            })
        })
        fetchContact()
        setFormValue(defaultFormValue)
    }

    const defaultFormValue = {
        textarea: ''
    };



    return (
        <div className="contact-card">
            <ButtonToolbar>
                <IconButton
                    className="card-button"
                    color="blue"
                    appearance="ghost"
                    size="md"
                    icon={<Trash/>}
                    onClick={() => deleteContact(contact.id)}
                    >
                        Delete Contact
                </IconButton>
                <IconButton
                    className="card-button"
                    color="blue"
                    appearance="ghost"
                    size="md"
                    icon={<Edit/>}
                    onClick={() => updateContact(contact.id)}
                    >
                        Edit Contact
                </IconButton>
            </ButtonToolbar>
            <div className="profile-details">
                <div className="pd-left">
                    <div className="pd-row">
                        <div className="image-div">
                            <img className='pd-image' src={contact.image_url} alt={contact.name}></img>
                            <div className="a-tag-div">
                                <a className="materials-icons" href={contact.email}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></a>
                                <a className="materials-icons" href={contact.phone}><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon></a>
                                <a className="materials-icons" href={contact.linkedin_profile_url} target="_blank"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a>
                            </div>
                            <div className="bio-modal-div">
                            <BioModal contact={contact} />
                            </div>
                        </div>
                        <div className="general-info">
                            <h3 className="contact-name">{contact.name}</h3>
                            <h4 className="contact-position">{contact.position}</h4>
                            <h4 className="contact-company" onClick={() => handleCompanyClick(contact.company_id)}>{contact.real_company_name}</h4>
                            
                            {/* <h4 className="company-id">Company ID: {contact.company_id}</h4> */}

                        </div>
                        {/* <hr></hr> */}
                        <div className="left-body">

                            {/* <h4>Email: {contact.email}</h4> */}

                            {/* <h4>Phone: {contact.phone}</h4> */}

                            <h4>Contact Owner: {contact.owner_name}</h4>
                            <h4>Contact Owner ID: {contact.user_id}</h4>
                            {/* <h4>Company: {contact.company_name}</h4> */}
                            {/* <h4>Position:{contact.position}</h4> */}
                            {/* <details>
                                <summary>Bio</summary>
                                <p>{contact.bio}</p>
                            </details> */}
                            {/* <p>{contact.bio}</p> */}
                            
                        </div>

                    </div>
                </div>
                <div className="pd-mid">
                    <Form
                        ref={formRef}
                        model={model}
                        formValue={formValue}
                        onChange={formValue => setFormValue(formValue)}
                        onSubmit={formClick}
                        style={{margin: 10}}
                        fluid
                    >
                        <Form.Group controlId="textarea">
                            <Form.ControlLabel>Note</Form.ControlLabel>
                            <Form.Control name="textarea" rows={10} accepter={Textarea} placeholder="write note..." ></Form.Control>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement="right"
                                trigger="active"
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit' >
                                    Submit
                                </Button>
                            </Whisper>
                            {/* <Button onClick={() => toaster.push(message)}>TESTING TOASTER</Button> */}
                        </ButtonToolbar>
                    </Form>
                    {/* <form className="note-form">
                        <button onClick={handleAddNote} className="note-button">
                            <span className="note_button_icon">
                                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                            </span>
                            <span className="note_button_text">Add Note</span>
                        </button>
                        <textarea placeholder=" write note..." className="note-input" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                    </form> */}

                    <hr></hr>
                    {/* <ul className="notes">
                    
                        {contact.notes?.reverse().map((note) => {
                            return (
                                    <li className='note' key={note.id}>{`note created: ${note.created_at} by: ${note.user_id} ${note.content}`}</li>
                            )
                        })}
                    </ul> */}
                    <div className="notes">
                        {notes?.map((note) => {
                            return (
                                <div key={note.id} className="note-div">
                                    {/* <p className="note-timestamp">{`${note.created_at.substring(0, 10)} | ${note.user_name}`}</p> */}
                                    <p className="note-timestamp">{`${Moment(note.created_at).format('MMMM DD, LT')} | ${note.user_name}`}</p>
                                    <p className="note">{note.content}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="pd-right">
                    <h3>Organization</h3>
                    <div className="pd-row">


                        <img onClick={() => handleCompanyClick(contact.company_id)} className="contact-company-logo" src={contact.company_logo} alt={contact.real_company_name}></img>
                        <div className="company-name">
                            <span>
                                <FontAwesomeIcon className="span-icon" icon={faBuilding}></FontAwesomeIcon>
                            </span>
                            <span>
                                <p className="span-content" onClick={() => handleCompanyClick(contact.company_id)}>{contact.company_name}</p>
                            </span>

                        </div>
                        <ProductsDrawer contact={contact} handleProductClick={handleProductClick}/>
                        {/* <details className="company-products">
                            <summary>Company Products</summary>

                            {contact.company_products?.map((product) => {
                                return (
                                    <li key={product.id} onClick={() => handleProductClick(product.id)}>{product.name}</li>
                                )
                            })}
                        </details> */}
                        <ContactsDrawer contact={contact} handleContactClick={handleContactClick}/>
                        {/* <details className="colleagues">
                            <summary>Colleagues</summary>
                            {contact.company_contacts?.filter(colleague => colleague.name !== contact.name).map(filteredColleague => {
                                return (
                                    <li key={filteredColleague.id} onClick={() => handleContactClick(filteredColleague.id)}>{filteredColleague.name}</li>
                                )
                            })}
                        </details> */}

                    </div>
                </div>
            </div>
            {isEditClicked ? <EditContact contact={contact} id={id} fetchContact={fetchContact} /> : null}
        </div>
    )
}

export default ContactCard