import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import PaginateContacts from "./PaginateContacts"
import './paginate.css'


const ContactsPage = ({conBlackList}) => {

    const [contacts, setContacts] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const [page, setPage] = useState(1)

    const [pageCount, setPageCount] = useState();

    const [sortField, setSortField] = useState('')
    const [order, setOrder] = useState('')

    useEffect(() => {
        getContactsForPage(page)
    }, [])

    const getContactsForPage = async (page) => {
        console.log('page', page)
        const res = await fetch(`http://localhost:3000/contacts_paginated/${page}?${sortField}=${order}`)
        const contactsPageData = await res.json()
        console.log('contactsPageData', contactsPageData)


        const contactsDataArray = contactsPageData.contacts
        console.log('contactsDataArray', contactsDataArray)
        const pagina = contactsPageData.page
        // console.log('pagina', pagina)
        const paginaCuenta = contactsPageData.page_count
        setPageCount(paginaCuenta)
        // console.log('paginaCuenta', paginaCuenta)

        let objKeys = Object.keys(contactsDataArray[0])
        console.log('objKeys', objKeys)

        let displayKeys = objKeys.filter((item) => !conBlackList.includes(item))

        contactsDataArray.map(objectElement => {
            conBlackList.map((element) => delete objectElement[element])
        })

        let displayContacts = contactsDataArray.filter((item) => !conBlackList.includes(item))


        console.log('displayKeys', displayKeys)
        console.log('displayContacts', displayContacts)

        setKeyArray(displayKeys)
        setContacts(displayContacts)

    }


    const handleSorting = (sortField, sortOrder) => {
        console.log('sortField, sortOrder', sortField, sortOrder)
    }



    const handleSortingChange = (field) => {
        console.log('field', field)

        console.log('sortField', sortField)
        console.log('order', order)

        const sortOrder =
        field === sortField && order === 'asc' ? 'desc' : 'asc'

        console.log('sortOrder', sortOrder)
        
        setSortField(field)
        setOrder(sortOrder)

        handleSorting(field, sortOrder)
        


    }

    console.log('contacts', contacts)


    return(
        <main>
            <table>
                <thead>
                    <tr>
                        {keyArray.map((key, index) => {
                            return (
                                <th key={index} onClick={() => handleSortingChange(key)}>{key}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact=>{
                        let contactVals = Object.values(contact)
                        return (
                            <tr>{contactVals.map((val, index) => {
                                return (
                                    <td key={index}>{val}</td>
                                )
                            })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <PaginateContacts pageCount={pageCount} setPageCount={setPageCount} getContactsForPage={getContactsForPage} data={contacts}/>

        </main>
    )
}

export default ContactsPage