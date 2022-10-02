import {Form, Input, Button, ButtonToolbar, SelectPicker } from 'rsuite'

import { useState, useEffect, forwardRef, useRef } from "react"

import {SchemaModel, StringType} from "schema-typed"

import { Popover, Whisper } from 'rsuite';

import {Message, useToaster} from 'rsuite'


const NewCompany = () => {

    const [name, setName] = useState('')
    const [website, setWebsite] = useState('')
    const [logoUrl, setLogoUrl] = useState('')
    const [description, setDescription] = useState('')

    const handleCompanySubmit = async (e) => {
        e.preventDefault();

        console.log('Company: ', {name, website, logoUrl, description})

        let req = await fetch(`http://localhost:3000/companies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                website: website,
                logoUrl: logoUrl,
                user_id: 1,
                description: description

            })
        })

        setName('')
        setWebsite('')
        setLogoUrl('')
    }

    // R Suite Form

    const toaster = useToaster()

    const message = (
        <Message showIcon type="success">
            Company Created
        </Message>
    )

    const [value, setValue] = useState(null)

    const [formValue, setFormValue] = useState({
        name: "",
        description: ""
    })

    const formRef = useRef()

    const model = SchemaModel({
        name: StringType().isRequired("Company name is required")
    })

    const formClick = async () => {
        if(!formRef.current.check()) {
            console.error('form error');
            return;
        }
        let fName = formValue.name
        let fDescription = formValue.description
        console.log(`New Company submitted: `,`name: ${fName}`, `description: ${fDescription}`)

        let req = await fetch(`http://localhost:3000/companies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fName,
                description: fDescription,
                user_id: 1
            })
        })
        setFormValue(defaultFormValue)
        toaster.push(message)
    }

    const defaultFormValue = {
        name: '',
        description: ''
    }

    return (
        <>
        <Form
        ref={formRef}
        model={model}
        formValue={formValue}
        onChange={formValue => setFormValue(formValue)}
        onSubmit={formClick}
        fluid
        >
            <Form.Group controlId='name'>
                <Form.ControlLabel>Company Name</Form.ControlLabel>
                <Form.Control name='name' />
                <Form.HelpText tooltip>Company Name is required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId='description'>
                <Form.ControlLabel>Description</Form.ControlLabel>
                <Form.Control name='description' />
                <Form.HelpText tooltip>Optional</Form.HelpText>
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
        </>

        // <div className="new-company-div">
        //     <h2>New Company</h2>
        //     <form className="new-company-form" onSubmit={handleCompanySubmit}>
        //         <input className='input' type='text' name='name' placeholder='Company Name' value={name} onChange={(e) => setName(e.target.value)}/>
        //         <input className='input' type='text' name='website' placeholder='Website' value={website} onChange={(e) => setWebsite(e.target.value)}/>
        //         <input className='input' type='text' name='website' placeholder='Logo' value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)}/>
        //         <input className='input' type='text' name='description' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
        //         <button type='submit'>Save</button>
        //     </form>
        // </div>
    )
}

export default NewCompany