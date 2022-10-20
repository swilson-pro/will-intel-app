import { Drawer, Form, SelectPicker } from "rsuite"

import AngleLeftIcon from '@rsuite/icons/legacy/AngleRight';

import { RadioGroup, Radio, ButtonToolbar, Button, IconButton, Placeholder, Input, InputGroup } from 'rsuite';

import { useEffect, useState } from 'react';

import { forwardRef, useRef } from "react"

import { SchemaModel, StringType } from "schema-typed"

import { Popover, Whisper } from 'rsuite';

import { Message, useToaster } from 'rsuite'

import EditIcon from '@rsuite/icons/Edit';

const EditCompanyDrawer = ({ company, fetchCompany }) => {
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
        let req = await fetch(`http://localhost:3000/api/companies/${company.id}`, {
            method: "PATCH",
            body: JSON.stringify(fNameVal),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchCompany()
        setFNameVal(defaultFNameVal)
    }

    const defaultFNameVal = {
        name: ""
    }

    //   website
    const [fWebsiteVal, setFWebsiteVal] = useState({
        website: ""
    })

    const websiteModel = SchemaModel({
        website: StringType().isRequired("website is required")
    })

    const fWebsiteClick = async () => {


        console.log('fWebsiteVal', fWebsiteVal)
        let req = await fetch(`http://localhost:3000/api/companies/${company.id}`, {
            method: "PATCH",
            body: JSON.stringify(fWebsiteVal),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchCompany()
        setFWebsiteVal(defaultWebsiteVal)
    }

    const defaultWebsiteVal = {
        website: ""
    }

    //   LINKEDIN
    const [fLinkedinVal, setFLinkedinVal] = useState({
        linkedin_regularCompanyUrl: ""
    })

    const linkedinModel = SchemaModel({
        linkedin_regularCompanyUrl: StringType().isRequired("linkedin url is required")
    })

    const fLinkedinClick = async () => {


        console.log('fLinkedinVal', fLinkedinVal)
        let req = await fetch(`http://localhost:3000/api/companies/${company.id}`, {
            method: "PATCH",
            body: JSON.stringify(fLinkedinVal),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchCompany()
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
            let req = await fetch(`http://localhost:3000/companys/${company.id}`, {
                method: "PATCH",
                body: JSON.stringify(fImageVal),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            fetchCompany()
            setFImageVal(defaultFImageVal)
        }
    
        const defaultFImageVal = {
            image_url: ""
        }

        // COMPANIES

        useEffect(() => {
            fetchOwners()
        }, [])

        const [fCompanyVal, setFCompanyVal] = useState({
            company_id: ""
        })
    
        const companyModel = SchemaModel({
            company_id: StringType().isRequired("website is required")
        })

        

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
            let req = await fetch(`http://localhost:3000/companys/${company.id}`, {
                method: "PATCH",
                body: JSON.stringify(
                    {user_id: findValue[0]}
                ),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            fetchCompany()
            setOwnerVal(null)

            // valueID = findValue[0]



            // console.log('findValue',findValue)
            // console.log('valueID', valueID)

        }




console.log('company.linkedin_regularCompanyUrl', company.linkedin_regularCompanyUrl)
    return (
        <>

            <hr />
            <ButtonToolbar>
                <IconButton appearance="ghost" color="blue" icon={<AngleLeftIcon />} onClick={() => handleOpen('left')}>
                    Edit company
                </IconButton>
            </ButtonToolbar>
            <Drawer size='lg' placement={placement} open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>Edit company</Drawer.Title>
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

                    <p>Company Name: {company.name}</p>
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
                            <Form.ControlLabel>{company.name}</Form.ControlLabel>
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
                    <p>Website: {company.website}</p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={websiteModel}
                        formValue={fWebsiteVal}
                        onChange={fWebsiteVal => setFWebsiteVal(fWebsiteVal)}
                        onSubmit={fWebsiteClick}
                        fluid
                    >
                        <Form.Group controlId='website'>
                            <Form.ControlLabel>{company.website}</Form.ControlLabel>
                            <Form.Control name='website' />
                            <Form.HelpText tooltip>Website is required</Form.HelpText>
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
                    <p>Linkedin URL:{company.linkedin_regularCompanyUrl}</p>
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
                            <Form.ControlLabel>{company.linkedin_profile_url}</Form.ControlLabel>
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
                    <p>Owner: {company.owner_name}</p>
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
                    <p>Image: <a src={company.image_url}>Link</a></p>
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

export default EditCompanyDrawer