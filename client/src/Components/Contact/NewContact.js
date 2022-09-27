import { useState, useEffect } from "react"

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



    const fetchCompanies = async () => {
        let req = await fetch(`http://localhost:3000/companies_names`)
        let res = await req.json()
        setCompanies(res)

    }

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target.value[0].value)
        

        // dealing with company name

        console.log('companies', companies)
        console.log('e.target', e.target)
        console.log('e.target[0].value', e.target[0].value)
        console.log('e.target[1].value', e.target[1].value)
        console.log('e.target[2].value', e.target[2].value)
        console.log('e.target[3].value', e.target[3].value)
        console.log('e.target[4].value', e.target[4].value)

        let newCompany = e.target[1].value

        console.log('newCompany', newCompany)
        // console.log('company[1]', company[1])
        // const result = companies.find(company => {
        //     console.log(company[1] == newCompany)
        // })


        const result = companies.find(company => {
            return company[1] == newCompany

        })

        let newCompanyName = result[1]
        console.log('result', result)
        console.log('result[0]', result[0])
        console.log('result[1]', result[1])

        let newCompanyID = result[0]
        

        console.log('newCompanyName', newCompanyName)

        console.log('Contact: ', {name, newCompanyName, position, phone, email, location, linkedin, image})

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
    }, [])



    
    return (
        <div className="new-contact-div">
            <h2>New Contact</h2>
            <form className='new-contact-form' onSubmit={handleContactSubmit}>
                <input className='input' type='text' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                {/* <input className='input' type='text' name='company_name' placeholder='Company' value={companyName} onChange={(e) => setCompanyName(e.target.value)} /> */}
                <label name='company'>Company: </label>
                <select name='company'>
                    <option>{companyName}</option>
                    {companies.map((company) => {
                        // return <option key={company[0] value={companyName} placeholder='Company' onChange={(e) => setCompanyName(e.target.value)}}>{company[1]}</option>
                        return <option key={company[0]} value={company[1]}>{company[1]}</option>
                    })}
                </select>
                <input className='input' type='text' name='position' placeholder='Position' value={position} onChange={(e) => setPosition(e.target.value)} />
                <input className='input' type='text' name='phone' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input className='input' type='text' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='input' type='text' name='location' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                <input className='input' type='text' name='linkedin' placeholder='Linkedin URL' value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                <input className='input' type='text' name='image_url' placeholder='Image URL' value={image} onChange={(e) => setImage(e.target.value)} />
                <button type='submit'>Save</button>
            </form>

        </div>
    )
}

export default NewContact