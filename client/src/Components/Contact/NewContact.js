import {Form, Input, Button, ButtonToolbar, SelectPicker } from 'rsuite'

import { useState, useEffect, forwardRef, useRef } from "react"

import {SchemaModel, StringType} from "schema-typed"

import { Popover, Whisper } from 'rsuite';

import {Message, useToaster} from 'rsuite'

import {Container, Header} from 'rsuite'


const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);



const NewContact = () => {

    const [name, setName] = useState('')
    const [companyName, setCompanyName] = useState('Choose Company')
    const [position, setPosition] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [image, setImage] = useState('')

    const [companies, setCompanies] =useState([])


    const [companiesNames, setCompaniesNames] = useState([])


    const fetchCompanies = async () => {
        let companiesArray = []
        let req = await fetch(`http://localhost:3000/companies_names`)
        let res = await req.json()

        setCompanies(res)

        res.map((company) => {
            companiesArray.push(company[1])
        })

        setCompaniesNames(companiesArray)
    }

    const data = companiesNames.map(item => ({label: item, value: item}))




    const handleContactSubmit = async (e) => {
        e.preventDefault();
        
        // dealing with company name

        // console.log('companies', companies)
        // console.log('e.target', e.target)
        // console.log('e.target[0].value', e.target[0].value)
        // console.log('e.target[1].value', e.target[1].value)
        // console.log('e.target[2].value', e.target[2].value)
        // console.log('e.target[3].value', e.target[3].value)
        // console.log('e.target[4].value', e.target[4].value)

        let newCompany = e.target[1].value

        // console.log('newCompany', newCompany)
        // console.log('company[1]', company[1])
        // const result = companies.find(company => {
        //     console.log(company[1] == newCompany)
        // })

        const result = companies.find(company => {
            return company[1] == newCompany

        })

        let newCompanyName = result[1]
        // console.log('result', result)
        // console.log('result[0]', result[0])
        // console.log('result[1]', result[1])

        let newCompanyID = result[0]
        
        // console.log('newCompanyName', newCompanyName)

        // console.log('Contact: ', {name, newCompanyName, position, phone, email, location, linkedin, image})

        let req = await fetch(`http://localhost:3000/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                user_id: 1,
                company_id: newCompanyID,
                // company_id: 1,
                position: position,
                phone: phone,
                email: email,
                location: location,
                linkedin_profile_url: linkedin,
                image_url: image
                // user_id: 1
            })
        })

        setName('')
        setCompanyName('')
        setPosition('')
        setPhone('')
        setEmail('')
        setLocation('')
        setLinkedin('')
        setImage('')
    }

    useEffect(() => {
        fetchCompanies()
    }, [name])

    // R Suite Form

    const toaster = useToaster()

    const message = (
        <Message showIcon type="success">
            Contact Created
        </Message>
    )

    const [value, setValue] = useState(null)

    

    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        position: "",
        textarea: ""
    })
    const formRef = useRef()

    const model = SchemaModel({
        name: StringType().isRequired("Full name is required"),
        // company_name: StringType().isRequired("Company Name Required"),
        email: StringType().isEmail("Valid Email Address is required").isRequired("wtf"),
        // textarea: StringType().isRequired("A MESSAGE MUST BE ENTERED!")
    })

    const formClick = async () => {
        if(!formRef.current.check()) {
            console.error("FORM ERROR!");
            return;
        }
        let fName = formValue.name
        let fEmail = formValue.email
        let fPosition = formValue.position
        let valueID
        let findValue = companies.find(company => {
            return company[1] == value
        })

        if (value == null) {valueID = null} else {
            valueID = findValue[0]
        }
        
        console.log('value', value)
        console.log('companies', companies)
        console.log('findValue', findValue)
        console.log('valueID', valueID)


        console.log('form has been submitted')
        console.log('formValue', formValue)
        console.log('fName', fName)
        console.log('fEmail', fEmail)
        console.log('fPosition', fPosition)

        console.log("New Contact: ", `name: ${fName}`,`Email: ${fEmail}`, `company_id: ${valueID}`, `company_name: ${value}` )
        let req = await fetch(`http://localhost:3000/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fName,
                email: fEmail,
                position: fPosition,
                user_id: 1,
                company_id: valueID
            })
        })
        setFormValue(defaultFormValue)
        // alert("New Contact Created")
        toaster.push(message)
        // window.location.reload(false)
    }

    const defaultFormValue = {
        name: '',
        company_name: '',
        email: '',
        position: '',
        textarea: ''
      };

    return (
        <>
        <h2 className='new-contact'>New Contact</h2>

        <Form 
        ref={formRef} 
        model={model}
        formValue={formValue}
        onChange={formValue => setFormValue(formValue)}
        onSubmit={formClick} 
        fluid
        >
            <Form.Group controlId="name">
                <Form.ControlLabel>Full Name</Form.ControlLabel>
                <Form.Control name="name" />
                <Form.HelpText tooltip>Full Name is required</Form.HelpText>
            </Form.Group>
            <SelectPicker value={value} onChange={setValue} label="Choose Company " data={data} block />
            <Form.Group controlId="email">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="email" />
                <Form.HelpText tooltip>Email is required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="position">
                <Form.ControlLabel>Position/Role</Form.ControlLabel>
                <Form.Control name="position" />
                <Form.HelpText tooltip>Position is required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="textarea">
                <Form.ControlLabel>Contact Description</Form.ControlLabel>
                <Form.Control name="textarea" rows={10} accepter={Textarea}></Form.Control>
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
        </>
        // <div className="new-contact-div">
        //     <h2>New Contact</h2>
        //     <form className='new-contact-form' onSubmit={handleContactSubmit}>
        //         <input className='input' type='text' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        //         {/* <input className='input' type='text' name='company_name' placeholder='Company' value={companyName} onChange={(e) => setCompanyName(e.target.value)} /> */}
        //         <label name='company'>Company: </label>
        //         <select name='company'>
        //             <option>{companyName}</option>
        //             {companies.map((company) => {
        //                 // return <option key={company[0] value={companyName} placeholder='Company' onChange={(e) => setCompanyName(e.target.value)}}>{company[1]}</option>
        //                 return <option key={company[0]} value={company[1]}>{company[1]}</option>
        //             })}
        //         </select>
        //         <input className='input' type='text' name='position' placeholder='Position' value={position} onChange={(e) => setPosition(e.target.value)} />
        //         <input className='input' type='text' name='phone' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
        //         <input className='input' type='text' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        //         <input className='input' type='text' name='location' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
        //         <input className='input' type='text' name='linkedin' placeholder='Linkedin URL' value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        //         <input className='input' type='text' name='image_url' placeholder='Image URL' value={image} onChange={(e) => setImage(e.target.value)} />
        //         <button type='submit'>Save</button>
        //     </form>

        // </div>
    )
}

export default NewContact