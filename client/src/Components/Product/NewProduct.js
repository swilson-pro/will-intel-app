import { useState, useEffect } from "react"

import NewCompany from "../Companies/NewCompany"

import { Form, Input, Button, ButtonToolbar, SelectPicker } from 'rsuite'

import { forwardRef, useRef } from "react"

import { SchemaModel, StringType } from "schema-typed"

import { Popover, Whisper } from 'rsuite';

import { Message, useToaster } from 'rsuite'

import { useSelector } from "react-redux"

const NewProduct = () => {

    const user = useSelector((state) => state.user).profile;



    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [companyName, setCompanyName] = useState('Choose Company')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [website, setWebsite] = useState('')

    const [companies, setCompanies] = useState([])

    const [companiesNames, setCompaniesNames] = useState([])

    const fetchCompanies = async () => {
        let companiesArray = []
        let req = await fetch(`http://localhost:3000/api/companies_names`)
        let res = await req.json()

        setCompanies(res)

        // console.log('res', res)

        res.map((company) => {
            companiesArray.push(company[1])
        })

        setCompaniesNames(companiesArray)
    }
    console.log('companiesNames', companiesNames)



    const data = companiesNames.map(
        item => ({ label: item, value: item })
    );

    const handleProductSubmit = async (e) => {
        e.preventDefault()


        // console.log('companies', companies)
        // console.log('e.target', e.target)
        // console.log('e.target[0].value', e.target[0].value)
        // console.log('e.target[1].value', e.target[1].value)
        // console.log('e.target[2].value', e.target[2].value)
        // console.log('e.target[3].value', e.target[3].value)
        // console.log('e.target[4].value', e.target[4].value)

        let newCompany = e.target[2].value

        console.log('newCompany', newCompany)

        const result = companies.find(company => {
            return company[1] == newCompany
        })

        let newCompanyID = result[0]
        let newCompanyName = result[1]
        console.log('newCompanyID', newCompanyID)
        console.log('newCompanyName', newCompanyName)

        console.log('product: ', { name, brand, newCompanyName, price, image, website })

        console.log('result', result)

        let req = await fetch(`http://localhost:3000/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                brand: brand,
                input_company_name: newCompanyID,
                price: price,
                image_link: image,
                website: website,
            })
        })
        setName('')
        setBrand('')
        setCompanyName('')
        setPrice('')
        setImage('')
        setWebsite('')
    }

    const formClick = async () => {
        // if (!formRef.current.check()) {
        //     console.error('form error')
        //     return;
        // }
        let fName = formValue.name
        let fCompany = formValue.companySelect

        if (!fName || !fCompany) {
            toaster.push(    
                <Message showIcon type="error" header="Error">
                    Something isn't right
              </Message>)
            return;
        }

        let companyObject = companies.find(company => {
            return company[1] == formValue.companySelect
        })

        let req = await fetch(`http://localhost:3000/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fName,
                company_id: companyObject[0],
                user_id: user.id
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                toaster.push(
                    <Message showIcon type="error" header="Error">
                        Try Again
                    </Message>)
            }
        })
        .then((data) => {
            console.log('data', data)
            setFormValue(defaultFormValue)
            toaster.push(message)
        })
        .catch(error => alert(error.res.data))
    }

    useEffect(() => {
        fetchCompanies()
    }, [])

    const toaster = useToaster()

    const message = (
        <Message showIcon type="success">
            Product Created
        </Message>
    )

    const [value, setValue] = useState(null)

    const [formValue, setFormValue] = useState({
        name: "",
        description: "",
        companySelect: ""
    })

    const formRef = useRef()

    const model = SchemaModel({
        name: StringType().isRequired("Product name is required")
    })




    const defaultFormValue = {

    }

    return (
        <>
            <h1 style={{margin: 40}}>New Product</h1>
            <Form
                style={{ margin: 40 }}
                ref={formRef}
                model={model}
                formValue={formValue}
                onChange={formValue => setFormValue(formValue)}
                onSubmit={formClick}
                fluid
            >
                <Form.Group controlId='name'>
                    <Form.ControlLabel>Product Name</Form.ControlLabel>
                    <Form.Control name='name' />
                    <Form.HelpText tooltip>Product Name is required</Form.HelpText>
                </Form.Group>
                <Form.Group controlId="companySelect">
                    <Form.ControlLabel>SelectPicker:</Form.ControlLabel>
                    <Form.Control name="companySelect" accepter={SelectPicker} data={data} />
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
        // <div className="new-product-div">
        //     <h2>New Product</h2>
        //     <form className="new-product-form" onSubmit={handleProductSubmit}>
        //         <input className='input' type='text' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
        //         <input className='input' type='text' name='brand' placeholder='Brand' value={brand} onChange={(e) => setBrand(e.target.value)}/>
        //         <select>
        //         <option>{companyName}</option>
        //             {companies.map((company) => {
        //                 // return <option key={company[0] value={companyName} placeholder='Company' onChange={(e) => setCompanyName(e.target.value)}}>{company[1]}</option>
        //                 return <option key={company[0]} value={company[1]}>{company[1]}</option>
        //             })}
        //         </select>
        //         <input className='input' type='number' name='price' placeholder='Price' value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}/>
        //         <input className='input' type='text' name='image' placeholder='Image URL' value={image} onChange={(e) => setImage(e.target.value)}/>
        //         <input className='input' type='text' name='website' placeholder='Website' value={website} onChange={(e) => setWebsite(e.target.value)}/>
        //         <button type='submit'>Save</button>
        //     </form>
        // </div>
    )
}

export default NewProduct