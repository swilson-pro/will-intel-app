import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import PaginateContacts from "./PaginateContacts"
import './paginate.css'


const ContactsPage = ({conBlackList}) => {

    const [contacts, setContacts] = useState([])

    const [page, setPage] = useState(1)

    const [pageCount, setPageCount] = useState();

    useEffect(() => {
        getContactsForPage(page)
    }, [])

    const getContactsForPage = async (page) => {
        console.log('page', page)
        const res = await fetch(`http://localhost:3000/contacts_paginated/${page}`)
        const contactsPageData = await res.json()
        console.log('contactsPageData', contactsPageData)
        const contactsDataArray = contactsPageData.contacts
        console.log('contactsDataArray', contactsDataArray)
        const pagina = contactsPageData.page
        console.log(pagina)
        const paginaCuenta = contactsPageData.page_count
        setPageCount(paginaCuenta)
        console.log('paginaCuenta', paginaCuenta)
        setContacts(contactsDataArray)
    }

    console.log('contacts', contacts)

    return(
        <main>

            <PaginateContacts pageCount={pageCount} setPageCount={setPageCount} getContactsForPage={getContactsForPage} data={contacts}/>

        </main>
    )
}

export default ContactsPage