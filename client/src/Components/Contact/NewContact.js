import { useState } from "react"

const NewContact = () => {

    const [name, setName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [position, setPosition] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [image, setImage] = useState('')


    const handleContactSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target.value[0].value)
        console.log('Contact: ', {name, companyName, position, phone, email, location, linkedin, image})

        let req = await fetch(`http://localhost:3000/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                company_name: companyName,
                position: position,
                phone: phone,
                email: email,
                location: location,
                linkedin_profile_url: linkedin,
                image_url: image,
                user_id: 1


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

    
    return (
        <div className="new-contact-div">
            <h2>New Contact</h2>
            <form className='new-contact-form' onSubmit={handleContactSubmit}>
                <input className='input' type='text' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input className='input' type='text' name='company_name' placeholder='Company' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
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