import { useState, useEffect } from "react"
import { Navigate, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import PaginateContacts from "./PaginateContacts"
import './paginate.css'
import '../../Style/ContactsTable.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import { Button, IconButton, Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'

import {useSelector} from 'react-redux'

const {Column, HeaderCell, Cell} = Table


const ContactsPage = ({conBlackList}) => {

    const user = useSelector((state) => state.user);

    console.log('user', user)

    let navigate = useNavigate()
    
    const [contacts, setContacts] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const [page, setPage] = useState(1)

    const [pageCount, setPageCount] = useState();

    const [sortField, setSortField] = useState('id')
    const [order, setOrder] = useState('')

    useEffect(() => {
        getContactsForPage(page, sortField, order)
    }, [page, sortField, order])

    const getContactsForPage = async (page) => {
        // console.log('page', page)
        const res = await fetch(`http://localhost:3000/contacts_paginated/${page}?${sortField}=${order}`)
        const contactsPageData = await res.json()
        // console.log('contactsPageData', contactsPageData)


        const contactsDataArray = contactsPageData.contacts
        // console.log('contactsDataArray', contactsDataArray)
        const pagina = contactsPageData.page
        // console.log('pagina', pagina)
        const paginaCuenta = contactsPageData.page_count
        setPageCount(paginaCuenta)
        // console.log('paginaCuenta', paginaCuenta)

        let objKeys = Object.keys(contactsDataArray[0])
        // console.log('objKeys', objKeys)

        let displayKeys = objKeys.filter((item) => !conBlackList.includes(item))

        contactsDataArray.map(objectElement => {
            conBlackList.map((element) => delete objectElement[element])
        })

        let displayContacts = contactsDataArray.filter((item) => !conBlackList.includes(item))


        // console.log('displayKeys', displayKeys)
        // console.log('displayContacts', displayContacts)

        setKeyArray(displayKeys)
        setContacts(displayContacts)

    }


    const handleSorting = (sortField, sortOrder) => {
        // console.log('sortField, sortOrder', sortField, sortOrder)
    }



    const handleSortingChange = (sortColumn) => {
        // console.log('field', field)

        // console.log('sortField', sortField)
        // console.log('order', order)

        const sortOrder =
        sortColumn === sortField && order === 'asc' ? 'desc' : 'asc'

        // console.log('sortOrder', sortOrder)
        
        setSortField(sortColumn)
        setOrder(sortOrder)

        handleSorting(sortColumn, sortOrder)
        


    }

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

    // console.log('contacts', contacts)

    const handleClick = (rowData) => {
        navigate(`/contacts/${rowData.id}`)
    }


    return(
        <main>

            <div className="button-container">
            {/* <NavLink className='new-contact-navlink' to='/contacts/new' >
                
                    <button type='button' className='new-contact'>
                        <span className="button_icon">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </span>
                        <span className="button_text">Person</span>
                    </button>
                
            </NavLink> */}
            <h1>Contacts</h1>

            
            </div>

            <Table 
            className="table"
            showHeader={true}
            height={1000}
            data={contacts}
            onRowClick={rowData => {
                handleClick(rowData)
            }}
            onSortColumn={handleSortingChange}
            fluid
            >
                {keyArray.map((key, index) => {
                    return (
                        <Column className="table-column" width={250} align="left" resizable sortable>
                            <HeaderCell className="table_header" key={index}>{formatter(key)}</HeaderCell>
                            <Cell className="table-cell" dataKey={key} />
                        </Column>
                    )
                })}
            </Table>
            <PaginateContacts pageCount={pageCount} setPageCount={setPageCount} getContactsForPage={getContactsForPage} data={contacts}/>

        </main>
    )
}

export default ContactsPage