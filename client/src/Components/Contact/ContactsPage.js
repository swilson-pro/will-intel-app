import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import PaginateContacts from "./PaginateContacts"

const ContactsPage = ({conBlackList}) => {

    // const blackList = ['bio', 'twitter_url', 'image_url', 'user_id']

    let navigate = useNavigate()

    const [ownersNames, setOwnersNames] = useState([])
    const [owner, setOwner] = useState("All")

    const [owners, setOwners] = useState([])
    const [paginatedOwner, setPaginatedOwner] = useState("All")

    const [contacts, setContacts] = useState([])

    const [keyArray, setKeyArray] = useState([])

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState()



    const fetchContacts = async () => {
        const res = await fetch(`http://localhost:3000/contacts_paginated/${page}`)
        const contactsPaginatedObject = await res.json()
        console.log('contactsPaginatedObject', contactsPaginatedObject)
        const contactsPageDataArray = contactsPaginatedObject.contacts
        console.log('contactsPageDataArray', contactsPageDataArray)
        const pagina = contactsPaginatedObject.page
        console.log('pagina', pagina)
        const paginaCuenta = contactsPaginatedObject.page_count
        console.log('paginaCuenta', paginaCuenta)
        const contactsArray = contactsPageDataArray

        let objKeys = Object.keys(contactsArray[0])

        let displayKeys = objKeys.filter((item) => !conBlackList.includes(item))

        contactsArray.map(objectElement => {
            conBlackList.map((element) => delete objectElement[element])
        })

        setKeyArray(displayKeys)

        setContacts(contactsArray)

    }

    const updateOwner = async (e) => {

        console.log('owners', owners)
        e.preventDefault()

        console.log('e', e)
        console.log('e.target', e.target)
        console.log('e.target[0]', e.target[0])
        console.log('e.target[0].value', e.target[0].value)

        const result = owners.find(owner => {
            return owner.name == e.target[0].value;
        })

        console.log('result', result)

        let res = await fetch(`http://localhost:3000/owners_contacts_paginated/${result.id}/${page}`)
        const contactsPaginatedObject = await res.json()
        const contactsArray = contactsPaginatedObject.contacts
        console.log('contactsArray', contactsArray)
        setContacts(contactsArray)

    
    }


    const fetchOwnersNames = async () => {
        const response = await fetch(`http://localhost:3000/users_names`)
        const ownersNamesArray = await response.json()
        const res = await fetch(`http://localhost:3000/users`)
        const ownersArray = await res.json()
        setOwners(ownersArray)
        setOwnersNames(ownersNamesArray)
    }

    useEffect(() => {
        // fetchContacts()
        fetchOwnersNames()
        fetchContacts()
    }, [paginatedOwner, owner])

    let formatter = (str) => {
        let arr = str.split('')
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '_') {
                arr[i] = " "
            }
        }
        for (let i = 0; i < arr.length; i++) {
            if (i == 0 || arr[i - 1] == " ") {
                arr[i] = arr[i].toUpperCase()
            }
        }
        let result = ""
        for (let i = 0; i < arr.length; i++) {
            result = result + arr[i]
        }
        return result
    }

    const handleClick = (id) => {

        navigate(`/contacts/${id}`)
    }



    return(
        <main>
            <div className='top-of-page'>
            <NavLink className='new-contact-navlink' to='/contacts/new' >

                <button className="new-contact">Create Contact</button></NavLink>

{/* PAGINATED FILTERS */}

            <div>
                <form onSubmit={updateOwner}>
                    <label>PAGINATE Choose Owner:</label>
                    <select name='ownersNames' id='ownersNames'>
                        <option value="All">All</option>
                        {ownersNames.map((ownerName) => {
                           return <option key={ownerName} value={ownerName}>{ownerName}</option>
                        })}
                    </select>
                    <input type="submit" value="Update Owner" />
                </form>
            </div>

            <div className="filter">

                <h4>Total: {contacts.length}</h4>
            </div>
            <PaginateContacts pageCount={pageCount} setPageCount={setPageCount}/>
            </div>
            <div className="fixTableHead">
            <table className='contacts-table'>
                <thead>
                    <tr>
                        {keyArray.map((key) => {
                            return(
                                <th key={key}>{formatter(key)}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    
                    {contacts.map(contact=>{
                        // console.log('Object.keys(contact)', Object.keys(contact))
                        let contactKeys = Object.keys(contact)
                        // console.log('contactKeys', contactKeys)
                        let contactVals = Object.values(contact)
                        // console.log('contactVals', contactVals)

                        return (
                            <tr key={contact.id} onClick={() => handleClick(contact.id)}>
                        {contactVals.map((val, index) => {

                            // console.log('val', val)
                            return (
                                <td key={index}>{val}</td>
                            )
                        })}
                        </tr>)
                        // return (
                            // <tr>
                            //     <td>{contact.id}</td>
                            //     <td>{contact.name}</td>
                            //     <td>{contact.company_name}</td>
                            //     <td>{contact.position}</td>
                            //     <td>{contact.bio}</td>
                            //     <td>{contact.phone}</td>
                            //     <td>{contact.email}</td>
                            //     <td>{contact.location}</td>
                            //     <td>{contact.twitter_url}</td>
                            //     <td>{contact.linkedin_profile_url}</td>
                            //     <td>{contact.linkedin_company_url}</td>
                            //     <td>{contact.user_id}</td>
                            //     <td>{contact.image_url}</td>

                            // </tr>
                        // )
                    })}
                    
                </tbody>
            </table>
            </div>



        </main>
    )
}

export default ContactsPage