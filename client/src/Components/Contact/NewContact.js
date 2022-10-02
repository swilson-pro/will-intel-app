import {Form, Input, Button, ButtonToolbar, SelectPicker } from 'rsuite'

import { useState, useEffect, forwardRef, useRef } from "react"

import {SchemaModel, StringType} from "schema-typed"




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

    const [value, setValue] = useState(null)

    const [formValue, setFormValue] = useState({
        name: "",
        company_name: "",
        email: "",
        textarea: ""
    })
    const formRef = useRef()

    const model = SchemaModel({
        name: StringType().isRequired("Full name required!"),
        company_name: StringType().isRequired("Company Name Required"),
        email: StringType().isEmail("Email must be valid!").isRequired("THIS IS REQUIRED"),
        textarea: StringType().isRequired("A MESSAGE MUST BE ENTERED!")
    })

    const formClick = async () => {
        if(!formRef.current.check()) {
            console.error("FORM ERROR!");
            return;
        }
        let fName = formValue.name
        let fCompany = formValue.company_name
        let fEmail = formValue.email
        console.log('value', value)
        console.log('form has been submitted')
        console.log('formValue', formValue)
        console.log('fName', fName)
        console.log('fCompany', fCompany)
        console.log('fEmail', fEmail)
        let req = await fetch(`http://localhost:3000/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fName,
                company_name: fCompany,
                email: fEmail,
                user_id: 1,
                company_id: 1
            })
        })
    }

    return (
        <Form 
        ref={formRef} 
        model={model}
        onChange={setFormValue}
        onSubmit={formClick} 
        fluid
        >
            <Form.Group controlId="name">
                <Form.ControlLabel>Full Name</Form.ControlLabel>
                <Form.Control name="name" />
                <Form.HelpText tooltip>Full Name is required</Form.HelpText>
            </Form.Group>
            <SelectPicker value={value} onChange={setValue} label="Choose Company " data={data} block />
            <Form.Group controlId="company_name">
                <Form.ControlLabel>Company Name</Form.ControlLabel>
                <Form.Control name="company_name" />
                <Form.HelpText tooltip>Company Name is required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="email" />
                <Form.HelpText>Email is required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="textarea">
                <Form.ControlLabel>Enter a message</Form.ControlLabel>
                <Form.Control name="textarea" rows={10} accepter={Textarea}></Form.Control>
            </Form.Group>
            <ButtonToolbar>
                <Button appearance='primary' type='submit'>
                    Submit
                </Button>
            </ButtonToolbar>
        </Form>
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