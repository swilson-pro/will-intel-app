import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PaginateContacts from "./PaginateContacts"
import './paginate.css'
import '../../Style/ContactsTable.css'

import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'

import {useSelector} from 'react-redux'

const {Column, HeaderCell, Cell} = Table

const ContactsPage = ({conBlackList}) => {

    const user = useSelector((state) => state.user);

    // console.log('user', user)

    let navigate = useNavigate()

    const [contactCount, setContactCount] = useState()

    const [loading, setLoading] = useState(true)
    
    const [contacts, setContacts] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const [page, setPage] = useState(1)

    const [pageCount, setPageCount] = useState();

    const [sortField, setSortField] = useState('id')
    const [order, setOrder] = useState('')

    useEffect(() => {
        getContactsForPage(page, sortField, order)
        getContactsCount()
    }, [page, sortField, order])

    const getContactsCount = async () => {
        const res = await fetch(`http://localhost:3000/count_contacts`)
        const count = await res.json()
        setContactCount(count)
    }

    const getContactsForPage = async (page) => {
        // console.log('page', page)
        setLoading(true)
        fetch(`http://localhost:3000/contacts_paginated/${page}?${sortField}=${order}`)
        .then(resp=> resp.json())
        .then(data=>{
            const contactsDataArray = data.contacts
            // console.log('contactsDataArray', contactsDataArray)
            const pagina = data.page
            // console.log('pagina', pagina)
            const paginaCuenta = data.page_count
            setPageCount(paginaCuenta)
            // console.log('paginaCuenta', paginaCuenta)
            
            let objKeys = Object.keys(contactsDataArray[0])
            // console.log('objKeys', objKeys)
            
            let displayKeys = objKeys.filter((item) => !conBlackList.includes(item))
            
            contactsDataArray.map(objectElement => {
                conBlackList.map((element) => delete objectElement[element])
            })
            
            let displayContacts = contactsDataArray.filter((item) => !conBlackList.includes(item))
            setKeyArray(displayKeys)
            setContacts(displayContacts)
            setLoading(false)
        })
        // console.log('contactsPageData', contactsPageData)




        // console.log('displayKeys', displayKeys)
        // console.log('displayContacts', displayContacts)


    }

    // console.log('page', page)

    // console.log('pageCount', pageCount)

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
            <p className='user-stats'>Contacts:  {contactCount}</p>
            <div className="button-container">
            </div>

            <Table 
            loading={loading}
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