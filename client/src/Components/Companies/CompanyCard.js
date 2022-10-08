import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import EditCompany from "./EditCompany";

import './CompanyCard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faEraser, faUserPen, faBuilding, faPencil } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

import { Container, Sidebar, Content, Sidenav, Nav, Form, Input, Button, ButtonToolbar, IconButton, Popover, Whisper } from 'rsuite';

import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

import { Visible, Unvisible, Others, UserBadge, Plus, Calendar, Trash, Edit } from '@rsuite/icons'

import { SchemaModel, StringType } from "schema-typed"

import Moment from 'moment';

import { useSelector } from 'react-redux'

import DescriptionModal from "./DescriptionModal";

import CompProductsDrawer from "./CompProductsDrawer";
import CompContactsDrawer from "./CompContactsDrawer";

import CompanyOptionsModal from "./CompanyOptionsModal";

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const CompanyCard = () => {

    const user = useSelector((state) => state.user).profile;

    const formRef = useRef()

    console.log('user', user)

    let navigate = useNavigate()

    let { id } = useParams()

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
    }, [])

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
                notable_id: company.id,
                notable_type: "Company",
                user_id: user.id

            })
        })
        fetchCompany()
        setFormValue(defaultFormValue)
    }

    const defaultFormValue = {
        textarea: ''
    };

    const [formValue, setFormValue] = useState({
        textarea: ""
    })

    console.log('company', company)
    return (
        <div className="card">
            <CompanyOptionsModal company={company} fetchCompany={fetchCompany} deleteCompany={deleteCompany} />
            <h5 className="card-header">Company</h5>
            <div className="profile-details">
                <div className="pd-left">
                    <div className="pd-row">
                        <div className="image-div">
                            {!company.logoUrl ?
                                <img className='pd-image' src={`https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`} alt={company.name}></img>
                                : <img className='pd-image' src={company.logoUrl} onError={(e) => (e.currentTarget.src ='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg')} alt={company.name}></img>}
                            <div className="a-tag-div">
                                <a className="materials-icons" href={company.linkedin_regularCompanyUrl} target="_blank"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a>
                                <a className="materials-icons" href={company.hq_email}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></a>
                                <a className="materials-icons" href={company.hq_phone}><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon></a>
                            </div>
                            <div className="modal-div">
                                {!company.description ? null : <DescriptionModal company={company} />}

                            </div>
                        </div>
                        <div className="general-info">
                            <h3>{company.name}</h3>
                            <h4>{<a href={company.website} target="_blank">{company.website}</a>}</h4>
                            <h4>Company Owner: {company.owner_name}</h4>
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
                        style={{ margin: 10 }}
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
                        </ButtonToolbar>
                    </Form>
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
                </div>
                <div className="pd-right">
                    <h3>More</h3>
                    <div className="pd-row">
                    <CompProductsDrawer company={company} handleProductClick={handleProductClick}/>
                    <CompContactsDrawer company={company} handleContactClick={handleContactClick}/>
                    </div>
                </div>
                {isEditClicked ? <EditCompany id={id} fetchCompany={fetchCompany} /> : null}
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