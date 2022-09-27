import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const ContactsPage = ({conBlackList}) => {

    // const blackList = ['bio', 'twitter_url', 'image_url', 'user_id']

    let navigate = useNavigate()

    const [ownersNames, setOwnersNames] = useState([])
    const [owner, setOwner] = useState("All")

    const [contacts, setContacts] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const [sortField, setSortField] = useState('')
    const [order, setOrder] = useState('asc')

    const [page, setPage] = useState(1)



    const fetchPaginatedContacts = async () => {
        const res = await fetch(`http://localhost:3000/contacts_paginated/${page}`)
        const contactsPaginatedObject = await res.json()
        console.log('contactsPaginatedObject', contactsPaginatedObject)
        console.log('contactsPaginatedObject.page', contactsPaginatedObject.page)
        console.log('contactsPaginatedObject.page_count', contactsPaginatedObject.page_count)

        const contactsArray = contactsPaginatedObject.contacts

        let objKeys = Object.keys(contactsArray[0])

        let displayKeys = objKeys.filter((item) => !conBlackList.includes(item))

        contactsArray.map(objectElement => {
            conBlackList.map((element) => delete objectElement[element])
        })

        let displayContacts = contactsArray.filter((item) => !conBlackList.includes(item))

        console.log('displayContacts(fetchPaginatedContacts', displayContacts)

    }

    const fetchContacts = async () => {
        const response = await fetch(`http://localhost:3000/contacts`)
        const contactsArray = await response.json()

        let objKeys = Object.keys(contactsArray[0])

        let displayKeys = objKeys.filter((item) => !conBlackList.includes(item))

        contactsArray.map(objectElement => {

            conBlackList.map((element) => delete objectElement[element])
        })

        let displayContacts = contactsArray.filter((item) => !conBlackList.includes(item))

        console.log('displayContacts', displayContacts)

        if (owner == "All") {
            setContacts(displayContacts)
        } else setContacts(displayContacts.filter(contact => contact.owner_name == owner))



        // i want to print out an array with all items
        setKeyArray(displayKeys)

    }

    const newDisplayedContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    })

    const fetchOwnersNames = async () => {
        const response = await fetch(`http://localhost:3000/users_names`)
        const ownersNamesArray = await response.json()
        setOwnersNames(ownersNamesArray)
    }

    useEffect(() => {
        fetchContacts()
        fetchOwnersNames()
        fetchPaginatedContacts()
    }, [owner])

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


    const handleSorting = (sortField, sortOrder) => {

        if (sortField) {
            const sorted = [...contacts].sort((a,b) => {
                return (
                    a[sortField]?.toString().localeCompare(b[sortField]?.toString(), 'en', {
                        numeric: true,
                    }) * (sortOrder === 'asc' ? 1 : -1)
                )
            })
            setContacts(sorted)
        }
    }

    const handleSortingChange = (field) => {
        const sortOrder = 
        field === sortField && order === 'asc' ? 'desc' : 'asc'

        setSortField(field)
        setOrder(sortOrder)
        handleSorting(field, sortOrder)
    }

    const updateOwner = (e) => {
        setOwner(e.target.value)
    }

    const handleClick = (id) => {

        navigate(`/contacts/${id}`)
    }



    return(
        <main>
            <div className='top-of-page'>
            <NavLink className='new-contact-navlink' to='/contacts/new' >
                <button className="new-contact">Create Contact</button></NavLink>
            <div className="filter">
                <label className='filterLabel'>Choose owner:</label>
                <select className="chooseBox" name='ownersNames' id='ownersNames' onChange={updateOwner}>
                    <option value="All">All</option>
                    {ownersNames.map((ownerName) => {
                        return <option key={ownerName} value={ownerName}>{ownerName}</option>
                    })}
                </select>
                <div className="searchbar">
                    <input className='searchbox'
                    type='text'
                    id='search'
                    placeholder='search by name'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <h4>Total: {contacts.length}</h4>
            </div>
            </div>
            <div className="fixTableHead">
            <table className='contacts-table'>
                <thead>
                    <tr>
                        {keyArray.map((key) => {
                            return(
                                <th key={key} onClick={() => handleSortingChange(key)}>{formatter(key)}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    
                    {newDisplayedContacts.map(contact=>{
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