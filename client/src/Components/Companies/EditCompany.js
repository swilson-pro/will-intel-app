import { useEffect, useState } from "react";

const EditCompany = ({id, fetchCompany}) => {

    console.log('id', id)

    const updateName = async (e) => {
        e.preventDefault()
        let newName = e.target[0].value
        console.log('e.target[0]', e.target[0])
        console.log('e.target[0].value', e.target[0].value)
        let req = await fetch(`http://localhost:3000/api/companies/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: newName
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchCompany()
    }

    const updateWebsite = async (e) => {
        e.preventDefault()
        let newWebsite = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/companies/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                website: newWebsite
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchCompany()
    }

    const updateLinkedin = async (e) => {
        e.preventDefault()
        let newLinkedin = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/companies/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                linkedin_regularCompanyUrl: newLinkedin
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchCompany()
    }
    
    const updateDescription = async (e) => {
        e.preventDefault()
        let newDescription = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/companies/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                description: newDescription
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        fetchCompany()
    }
return (
    <div>
        <form onSubmit={updateName}>
            <input type="text" placeholder="Update Name"/>
            <input type="submit" value="Update Name" />
        </form>
        <form onSubmit={updateWebsite}>
            <input type="text" placeholder="Update Website"/>
            <input type="submit" value="Update Website" />
        </form>
        <form onSubmit={updateLinkedin}>
            <input type="text" placeholder="Update Company Linkedin"/>
            <input type="submit" value="Update Company Linkedin" />
        </form>
        <form onSubmit={updateDescription}>
                <textarea placeholder="Update Company Description"/>
                <input type="submit" value="Update Company Description" />
            </form>
    </div>
)
}

export default EditCompany