import { useEffect, useState } from "react"
import CompaniesPage from "../Companies/CompaniesPage"


const EditContact = ({id, contact, fetchContact}) => {
    // console.log('id', id)
    // console.log('contact', contact)

    const [owners, setOwners] = useState([])
    const [owner, setOwner] = useState("Update Owner")

    // const [companies, setCompanies] = useState([])

    const [companies, setCompanies] = useState([])



    // const fetchCompanies = async () => {
    //     let req = await fetch(`http://localhost:3000/companies`)
    //     let res = await req.json()
    //     setCompanies(res)
    // }

    const fetchCompanies = async () => {
        let req = await fetch(`http://localhost:3000/api/companies_names`)
        let res = await req.json()
        setCompanies(res)
    }

    const fetchOwners = async () => {
        const response = await fetch(`http://localhost:3000/users`)
        const ownersArray = await response.json()
        setOwners(ownersArray)
    }

    useEffect(() => {
        // fetchCompanies()
        fetchOwners()
        fetchCompanies()
    }, [])

    const updateName = async (e) => {
        e.preventDefault()
        let newName = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: newName
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchContact()
    }

    const updateEmail = async (e) => {
        e.preventDefault()

        let newEmail = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                email: newEmail
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchContact()
    }

    const updatePosition = async (e) => {
        e.preventDefault()
        let newPosition = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                position: newPosition
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchContact()
    }

    const updateImage = async (e) => {
        e.preventDefault()
        let newImage = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                image_url: newImage
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        fetchContact()
    }

    const updateLinkedin = async (e) => {
        e.preventDefault()
        let newLinkedin = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                linkedin_profile_url: newLinkedin
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        fetchContact()
    }

    const updateBio = async (e) => {
        e.preventDefault()
        console.log('e.target[0].value', e.target[0].value)
        let newBio = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                bio: newBio
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        fetchContact()
    }

    // const updateCompanyName = async (e) => {
    //     e.preventDefault()
    //     let newCompanyName = e.target[0].value
    //     let req = await fetch(`http://localhost:3000/contacts/${id}`, {
    //         method: "PATCH",
    //         body: JSON.stringify({
    //             company_name: newCompanyName
    //         }),
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     })
    //     fetchContact()
    // }

    const updateCompany = async (e) => {
        e.preventDefault()
        let newCompanyID
        console.log('companies', companies)
        console.log('e.target[0].value', e.target[0].value)
        const result = companies.find(company => {
            return company[1] == e.target[0].value;
        })
        console.log('result[0]', result[0])
        console.log('result[1]', result[1])

        let req = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                company_id: result[0]
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        // for (let i = 0; i < companies; i++) {
        //     if (companies[i][1] == e.target[0].value) {
        //         console.log('companies[i][1]', companies[i][1]) 
        //             newCompanyID = companies[i][0]
        //             console.log('newCompanyID', newCompanyID)
                
        //     }
        // }
        // let req = await fetch(`http://localhost:3000/contacts/${id}`, {
        //     method: "PATCH",
        //     body: JSON.stringify({
        //         company_id: newCompanyID
        //     }),
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // })
        fetchContact()
    }


    const updateOwner = async (e) => {
        e.preventDefault()
        let newOwner

        for (let i = 0; i < owners.length; i++) {
            if (owners[i].name == e.target[0].value) {
                newOwner = owners[i]
            }
        }
        let req = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                user_id: newOwner.id
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchContact()
    }
    // const updateOwner = async (e) => {
    //     let newOwner = e.target[0].value
    //     let req = await fetch(`http://localhost:3000/contacts/${id}`, {
    //         method: "PATCH",
    //         body: JSON.stringify({
    //             input_owner_name: newOwner
    //         }),
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     })
    //     fetchContact()
    // }



    
    return(
        <div>
            <form onSubmit={updateName}>
                <input type="text" placeholder="Update Name"/>
                <input type="submit" value="Update Name" />
            </form>
            <form onSubmit={updateEmail}>
                <input type="text" placeholder="Update Email"/>
                <input type="submit" value="Update Email" />
            </form>
            <form onSubmit={updatePosition}>
                <input type="text" placeholder="Update Position"/>
                <input type="submit" value="Update Position" />
            </form>
            {/* <form onSubmit={updateCompanyName}>
                <input type="text" placeholder="Update Company"/>
                <input type="submit" value="Update Company" />
            </form> */}
            <form onSubmit={updateCompany}>

                    <select>
                        {/* {companies.map((company) => {
                            return <option id={company.id} value={company.name}>{company.name}</option>
                        })} */}
                        {companies.map((company) => {
                            return <option key={company[0]} value={company[1]}>{company[1]}</option>
                        })}
                    </select>
                    <select></select>
                    <input type="submit" value="Update Company" />

            </form>

            <form onSubmit={updateOwner}>
                <label>
                    <select>
                        {owners.map((owner) => {
                            return <option key={owner.id} value={owner.name}>{owner.name}</option>
                        })}
                    </select>
                    <input type="submit" value="Update Owner" />
                </label>
            </form>
            {/* <div>
                <label htmlFor="owners">Choose Owner</label>
                <select onChange={updateOwner} name='owners' id='owners' value={owner}>
                <option value={owner}>{owner}</option>
                {owners.map((owner) => {
                    return <option value={owner.name}>{owner.name}</option>
                })}
                </select>
                
            </div> */}

            <form onSubmit={updateLinkedin}>
                <input type="text" placeholder="Update Linkedin"/>
                <input type="submit" value="Update Linkedin" />
            </form>
            <form onSubmit={updateImage}>
                <input type="text" placeholder="Paste Image URL"/>
                <input type="submit" value="Update Image" />
            </form>
            <form onSubmit={updateBio}>
                <textarea placeholder="Update Bio"/>
                <input type="submit" value="Update Bio" />
            </form>

        </div>
    )
}

export default EditContact