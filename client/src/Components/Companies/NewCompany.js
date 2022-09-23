import { useState } from "react"

const NewCompany = () => {

    const [name, setName] = useState('')
    const [website, setWebsite] = useState('')
    const [logoUrl, setLogoUrl] = useState('')

    const handleContactSubmit = async (e) => {
        e.preventDefault();

        console.log('Company: ', {name, website, logoUrl})

        let req = await fetch(`http://localhost:3000/companies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                website: website,
                logoUrl: logoUrl,
                user_id: 1

            })
        })

        setName('')
        setWebsite('')
        setLogoUrl('')
    }

    return (
        <div className="new-company-div">
            <h2>New Company</h2>
            <form className="new-company-form" onSubmit={handleContactSubmit}>
                <input className='input' type='text' name='name' placeholder='Company Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input className='input' type='text' name='website' placeholder='Website' value={website} onChange={(e) => setWebsite(e.target.value)}/>
                <input className='input' type='text' name='website' placeholder='Logo' value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)}/>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default NewCompany