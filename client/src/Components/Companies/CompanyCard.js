import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditCompany from "./EditCompany";

import './CompanyCard.css'

import {Button, ButtonToolbar, IconButton} from 'rsuite';
import {Visible, Unvisible, Others, UserBadge, Plus} from '@rsuite/icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faEraser, faUserPen, faBuilding, faPencil } from '@fortawesome/free-solid-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'

import {Container, Sidebar, Content, Sidenav, Nav} from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

import Moment from 'moment';

const CompanyCard = () => {

    let user = {id: 1}

    let navigate = useNavigate()

    let {id} = useParams()

    const [company, setCompany] = useState({})
    const [isEditClicked, setIsEditClicked] = useState(false)

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")

    const fetchCompany = async () => {
        const response = await fetch(`http://localhost:3000/companies/${id}`)
        const companyObj = await response.json()
        setCompany(companyObj)
        let reverseOrderNotes = companyObj.notes.reverse()
        setNotes(reverseOrderNotes)
    }

    useEffect(() => {
        fetchCompany()
    },[])

    const updateCompany = async () => {
        setIsEditClicked(!isEditClicked)
    }

    const deleteCompany = async (id) => {
        console.log('clicked', id)
        let req = await fetch(`http://localhost:3000/companies/${id}`, {
            method: "DELETE",
        })
        .then(alert("Company Deleted"))
        backToCompanies()
    }

    const backToCompanies = () => {
        navigate(`/companies`)
    }

    const handleProductClick = (id) => {
        console.log('clicked', id)
        navigate(`/products/${id}`)
    }

    const handleContactClick = (id) => {
        console.log('clicked', id)
        navigate(`/contacts/${id}`)
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
                notable_id: company.id,
                notable_type: "Company",
                user_id: user.id

            })
        })
        fetchCompany()
        setNewNote("")
    }

// for rsuite sidebar attempt
    // const [expand, setExpand] = useState(true)

    // const headerStyles = {
    //     padding: 18,
    //     fontSize: 16,
    //     height: 56,
    //     background: '#34c3ff',
    //     color: ' #fff',
    //     whiteSpace: 'nowrap',
    //     overflow: 'hidden'
    //   };
    console.log('company', company)
    return (
        <div className="company-card">
            <ButtonToolbar>
                <IconButton
                    color="blue"
                    appearance='ghost'
                    size='md'
                    icon={<Plus/>}
                    onClick={() => deleteCompany(company.id)}
                    >
                        Delete Company

                </IconButton>
                  <IconButton
                  color="blue" 
                  appearance='ghost' 
                  size='md' 
                  icon={<Plus />}
                  onClick={updateCompany}
                >
                    Edit Company Details
                </IconButton>
                </ButtonToolbar>
                {/* <button onClick={() => deleteCompany(company.id)}>Delete Company</button>
                <button onClick={updateCompany}>Update Company Details</button> */}
                <div className="profile-details">
                    <div className="pd-left">
                        <div className="pd-row">
                            <div className="image-div">
                                <img className='pd-image' src={company.logoUrl} alt={company.name}></img>
                                <a className="materials-icons" href={company.linkedin_regularCompanyUrl} target="_blank"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a>
                                <a className="materials-icons" href={company.hq_email}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></a>
                                <a className="materials-icons" href={company.hq_phone}><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon></a>
                            </div>
                            <div>
                                <h3>{company.name}</h3>
                                <h4>{<a href={company.website} target="_blank">{company.website}</a>}</h4>
                            </div>
                            <div className="left-body">
                                <h4>Company Owner: {company.owner_name}</h4>
                                <h4>Company Owner ID: {company.user_id}</h4>
                                <details>
                                    <summary>Company Description</summary>
                                    <p>Description: {company.description}</p>
                                </details>
                            </div>
                        </div>
                    </div>
                        <div className="pd-mid">
                        <form className="note-form">
                            <button onClick={handleAddNote} className="note-button">
                                <span className="note_button_icon">
                                    <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                                </span>
                                <span className="note_button_text">Add Note</span>
                            </button>
                            <textarea placeholder=" write note..." className="note-input" value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
                        </form>
                            <h2>Notes</h2>
                            <hr></hr>
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
                            <div className="notes">
                                <div className="note-div">
                                    <p className="note-timestamp">jan 12, 2022, 3PM | Alex</p>
                                    <p className="note">Here's a note for you!</p>
                                </div>
                            </div>
                        </div>
                        <div className="pd-right">
                            <h3>More Info</h3>
                            <div className="pd-row">
                                <details className="company-products">
                                    <summary>Company Products</summary>

                                    {company.products?.map((product) => {
                                            return (
                                                <li key={product.id} onClick={() => handleProductClick(product.id)}>{product.name}</li>
                                            )
                                        })}
                                </details>

                                <details className="colleagues">
                                    <summary>Contacts at Company</summary>

                                    {company.contacts?.map((contact) => {
                                            return (
                                                <li key={contact.id} onClick={() => handleContactClick(contact.id)}>{contact.name}</li>
                                            )
                                        })}
                                </details>
                            </div>
                        </div>
                        {isEditClicked ? <EditCompany id={id} fetchCompany={fetchCompany}/> : null}
                </div>







            {/* <Container>
                <Sidebar 
                    style={{display: 'flex', flexDirection: 'column'}}
                    width={expand ? 260 : 56}
                    collapsible
                >
                    <Sidenav.Header>
                        <div style={headerStyles}>
                            <span style={{marginLeft: 12}}>BRANDON</span>
                        </div>
                    </Sidenav.Header>
                    <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" active icon={<DashboardIcon/>}>
                                    Dashboard
                                </Nav.Item>
                                <Nav.Item eventKey="2" icon={<GroupIcon />}>
                                    User Group
                                </Nav.Item>
                                <Nav.Menu
                                eventKey="3"
                                trigger="hover"
                                title="Advanced"
                                icon={<MagicIcon />}
                                placement="rightStart"
                                >
                                    <Nav.Item eventKey="3-1">Geo</Nav.Item>
                                    <Nav.Item eventKey="3-2">Devices</Nav.Item>
                                    <Nav.Item eventKey="3-3">Brand</Nav.Item>
                                    <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                                    <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                                </Nav.Menu>
                                <Nav.Menu
                                eventKey="4"
                                trigger="hover"
                                title="Settings"
                                icon={<GearCircleIcon />}
                                placement="rightStart"
                                >
                                    <Nav.Item eventKey="4-1">Applications</Nav.Item>
                                    <Nav.Item eventKey="4-2">Websites</Nav.Item>
                                    <Nav.Item eventKey="4-3">Channels</Nav.Item>
                                    <Nav.Item eventKey="4-4">Tags</Nav.Item>
                                    <Nav.Item eventKey="4-5">Versions</Nav.Item>

                                </Nav.Menu>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                </Sidebar>
                <Content>Content</Content>
            </Container> */}
        </div>
    )
}

export default CompanyCard