import { Drawer, Form, SelectPicker } from "rsuite"

import AngleLeftIcon from '@rsuite/icons/legacy/AngleRight';

import { RadioGroup, Radio, ButtonToolbar, Button, IconButton, Placeholder, Input, InputGroup } from 'rsuite';

import { useEffect, useState } from 'react';

import { forwardRef, useRef } from "react"

import { SchemaModel, StringType } from "schema-typed"

import { Popover, Whisper } from 'rsuite';

import { Message, useToaster } from 'rsuite'

import EditIcon from '@rsuite/icons/Edit';

const EditContactDrawer = ({ contact, id, fetchContact }) => {
    const [size, setSize] = useState('lg');
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();

    const [companies, setCompanies] = useState([])
    const [companiesNames, setCompaniesNames] = useState([])
    const [value, setValue] = useState(null)
    const [ownerVal, setOwnerVal] = useState(null)
    const [owners, setOwners] = useState([])
    const [ownersNames, setOwnersNames] = useState([])

    const handleOpen = key => {
        setOpen(true);
        setPlacement(key);
    };

    //   NAME
    const [fNameVal, setFNameVal] = useState({
        name: ""
    })

    const nameModel = SchemaModel({
        name: StringType().isRequired("Name is required")
    })


    const formRef = useRef()


    const fNameClick = async () => {


        console.log('fNameVal', fNameVal)
        let req = await fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
            method: "PATCH",
            body: JSON.stringify(fNameVal),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchContact()
        setFNameVal(defaultFNameVal)
    }

    const defaultFNameVal = {
        name: ""
    }

    //   EMAIL
    const [fEmailVal, setFEmailVal] = useState({
        email: ""
    })

    const emailModel = SchemaModel({
        email: StringType().isRequired("email is required")
    })

    const fEmailClick = async () => {


        console.log('fEmailVal', fEmailVal)
        let req = await fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
            method: "PATCH",
            body: JSON.stringify(fEmailVal),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchContact()
        setFEmailVal(defaultFEmailVal)
    }

    const defaultFEmailVal = {
        email: ""
    }

    //   Position
    const [fPositionVal, setFPositionVal] = useState({
        position: ""
    })

    const positionModel = SchemaModel({
        position: StringType().isRequired("position is required")
    })

    const fPositionClick = async () => {


        console.log('fPositionVal', fPositionVal)
        let req = await fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
            method: "PATCH",
            body: JSON.stringify(fPositionVal),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchContact()
        setFPositionVal(defaultPositionVal)
    }

    const defaultPositionVal = {
        position: ""
    }

    //   LINKEDIN
    const [fLinkedinVal, setFLinkedinVal] = useState({
        linkedin_profile_url: ""
    })

    const linkedinModel = SchemaModel({
        linkedin_profile_url: StringType().isRequired("linkedin url is required")
    })

    const fLinkedinClick = async () => {


        console.log('fLinkedinVal', fLinkedinVal)
        let req = await fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
            method: "PATCH",
            body: JSON.stringify(fLinkedinVal),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchContact()
        setFLinkedinVal(defaultLinkedinVal)
    }

    const defaultLinkedinVal = {
        linkedin_profile_url: ""
    }

        //   IMAGE
        const [fImageVal, setFImageVal] = useState({
            image_url: ""
        })
    
        const imageModel = SchemaModel({
            image_url: StringType().isRequired("image url is required")
        })
    
        const fImageClick = async () => {
    
    
            console.log('fImageVal', fImageVal)
            let req = await fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
                method: "PATCH",
                body: JSON.stringify(fImageVal),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            fetchContact()
            setFImageVal(defaultFImageVal)
        }
    
        const defaultFImageVal = {
            image_url: ""
        }

        // COMPANIES

        useEffect(() => {
            fetchCompanies()
            fetchOwners()
        }, [])

        const [fCompanyVal, setFCompanyVal] = useState({
            company_id: ""
        })
    
        const companyModel = SchemaModel({
            company_id: StringType().isRequired("position is required")
        })

        const fetchCompanies = async () => {
            let companiesArray = []
            let req = await fetch(`http://localhost:3000/api/companies_names`)
            let res = await req.json()
    
            setCompanies(res)
    
            res.map((company) => {
                companiesArray.push(company[1])
            })
    
            setCompaniesNames(companiesArray)
        }

        const data = companiesNames.map(item => ({label: item, value: item}))

        const fCompanyClick = async () => {
            // alert('company clicked')
            console.log('value', value)
            console.log('companies', companies)
            let valueID
            let findValue = companies.find(company => {
                return company[1] == value
            })
            console.log('findValue[0]', findValue[0])
            let req = await fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
                method: "PATCH",
                body: JSON.stringify(
                    {company_id: findValue[0]}
                ),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            fetchContact()
            setValue(null)

            // valueID = findValue[0]



            // console.log('findValue',findValue)
            // console.log('valueID', valueID)

            console.log('im here')
            
            setValue(null)
        }

        

        const [fOwnerVal, setFOwnerVal] = useState({
            user_id: ""
        })
    
        const ownerModel = SchemaModel({
            user_id: StringType().isRequired("owner is required")
        })


        const fetchOwners = async () => {
            let ownersArray = []
            let req = await fetch(`http://localhost:3000/user_name_objects`)
            let res = await req.json()
    
            setOwners(res)
    
            res.map((owner) => {
                ownersArray.push(owner[1])
            })
    
            setOwnersNames(ownersArray)
        }

        const ownerData = ownersNames.map(item => ({label: item, value: item}))

        const fOwnerClick = async () => {
            console.log('ownerVal', ownerVal)
            console.log('owners', owners)
            let valueID
            let findValue = owners.find(owner => {
                return owner[1] == ownerVal
            })
            console.log('findValue[0]', findValue[0])
            let req = await fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
                method: "PATCH",
                body: JSON.stringify(
                    {user_id: findValue[0]}
                ),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            fetchContact()
            setOwnerVal(null)

            // valueID = findValue[0]



            // console.log('findValue',findValue)
            // console.log('valueID', valueID)

        }





    return (
        <>

            <hr />
            <ButtonToolbar>
                <IconButton appearance="ghost" color="blue" icon={<AngleLeftIcon />} onClick={() => handleOpen('left')}>
                    Edit Contact
                </IconButton>
            </ButtonToolbar>
            <Drawer size='lg' placement={placement} open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>Edit Contact</Drawer.Title>
                    <Drawer.Actions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => setOpen(false)} appearance="primary">
                            Confirm
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body>

                    {/* <InputGroup>
    <Input placeholder="Name" />
    <InputGroup.Button onClick={updateName}>
    <EditIcon/>
    </InputGroup.Button>
  </InputGroup> */}

                    {/* NAME */}

                   

                    
                    {/* <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={companyModel}
                        formValue={fCompanyVal}
                        onChange={fCompanyVal => setFCompanyVal(fCompanyVal)}
                        onSubmit={fCompanyClick}
                        fluid
                    >
                        <Form.Group controlId='company'>
                            <Form.ControlLabel></Form.ControlLabel>
                            <Form.Control name='company' />
                            <Form.HelpText tooltip>Company URL is required</Form.HelpText>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form> */}

                    <p>Name:</p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={nameModel}
                        formValue={fNameVal}
                        onChange={fNameVal => setFNameVal(fNameVal)}
                        onSubmit={fNameClick}
                        fluid
                    >
                        <Form.Group controlId='name'>
                            <Form.ControlLabel>{contact.name}</Form.ControlLabel>
                            <Form.Control name='name' />
                            <Form.HelpText tooltip>Product Name is required</Form.HelpText>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>
                    <p>Email:</p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={emailModel}
                        formValue={fEmailVal}
                        onChange={fEmailVal => setFEmailVal(fEmailVal)}
                        onSubmit={fEmailClick}
                        fluid
                    >
                        <Form.Group controlId='email'>
                            <Form.ControlLabel>{contact.email}</Form.ControlLabel>
                            <Form.Control name='email' />
                            <Form.HelpText tooltip>Email is required</Form.HelpText>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>
                    <p>Position:</p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={positionModel}
                        formValue={fPositionVal}
                        onChange={fPositionVal => setFPositionVal(fPositionVal)}
                        onSubmit={fPositionClick}
                        fluid
                    >
                        <Form.Group controlId='position'>
                            <Form.ControlLabel>{contact.position}</Form.ControlLabel>
                            <Form.Control name='position' />
                            <Form.HelpText tooltip>Position is required</Form.HelpText>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>
                    <p>Linkedin URL:</p>
                    {/*    LINKEDIN ISN'T WORKING. */}
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={linkedinModel}
                        formValue={fLinkedinVal}
                        onChange={fLinkedinVal => setFLinkedinVal(fLinkedinVal)}
                        onSubmit={fLinkedinClick}
                        fluid
                    >
                        <Form.Group controlId='linkedin'>
                            <Form.ControlLabel>{contact.linkedin_profile_url}</Form.ControlLabel>
                            <Form.Control name='linkedin' />
                            <Form.HelpText tooltip>Linkedin URL is required</Form.HelpText>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>
                    <p>Owner: {contact.owner_name}</p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={ownerModel}
                        formValue={fOwnerVal}
                        onChange={fOwnerVal => setFOwnerVal(fOwnerVal)}
                        onSubmit={fOwnerClick}
                        fluid
                    >

                    <SelectPicker value={ownerVal} onChange={setOwnerVal} label="Choose Owner " data={ownerData} block />
                                            <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>
                    <p>Company: {contact.real_company_name}</p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={companyModel}
                        formValue={fCompanyVal}
                        onChange={fCompanyVal => setFCompanyVal(fCompanyVal)}
                        onSubmit={fCompanyClick}
                        fluid
                    >

                    <SelectPicker value={value} onChange={setValue} label="Choose Company " data={data} block />
                                            <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>
                    <p>Image: <a src={contact.image_url}>Link</a></p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={imageModel}
                        formValue={fImageVal}
                        onChange={fImageVal => setFImageVal(fImageVal)}
                        onSubmit={fImageClick}
                        fluid
                    >
                        <Form.Group controlId='image'>
                            <Form.ControlLabel></Form.ControlLabel>
                            <Form.Control name='image' />
                            <Form.HelpText tooltip>Image URL is required</Form.HelpText>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>


                </Drawer.Body>
            </Drawer>
        </>
    )
}

export default EditContactDrawer