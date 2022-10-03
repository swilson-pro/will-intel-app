import { useEffect, useState } from "react"
import { Navigate, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import PaginateCompanies from "./PaginateCompanies"
import { Button, IconButton, Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'
import '../../Style/CompaniesTable.css'





// import 'rsuite/styles/index.less';
// import 'custom-theme.less';

import PlusIcon from '@rsuite/icons/Plus';

const {Column, HeaderCell, Cell} = Table


const CompaniesPage = ({compBlackList}) => {

    // const compBlackList = ['description', 'logoUrl', 'pb_companyID', 'company_also_known_as', 'parent_company', 'company_legal_name', 'primary_industry_sector', 'primary_industry_group', 'primary_industry_code']

    let navigate = useNavigate()

    const [ownersNames, setOwnersNames] = useState([])
    const [owner, setOwner] = useState("All")

    const [companies, setCompanies] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const [sortField, setSortField] = useState('primary_contact')
    const [order, setOrder] = useState('')






    const [page, setPage] = useState(1)

    const [pageCount, setPageCount] = useState();




    useEffect(() => {
        getCompaniesForPage(page, sortField, order)
    }, [owner, page, sortField, order])


    const getCompaniesForPage = async (page) => {
        // console.log('page', page)
        // console.log('order', order)
        // console.log('sortField', sortField)
        const res = await fetch(`http://localhost:3000/companies_paginated/${page}?${sortField}=${order}`)
        const companiesPageData = await res.json()
        // console.log('companiesPageData', companiesPageData)


        const companiesDataArray = companiesPageData.companies
        // console.log('companiesDataArray', companiesDataArray)
        const pagina = companiesPageData.page
        // console.log('pagina', pagina)
        const paginaCuenta = companiesPageData.page_count
        setPageCount(paginaCuenta)
        // console.log('paginaCuenta', paginaCuenta)


        let pObjKeys = Object.keys(companiesDataArray[0])
        // console.log('pObjKeys', pObjKeys)

        let pDisplayKeys = pObjKeys.filter((item) => !compBlackList.includes(item))

        companiesDataArray.map(objectElement => {
            compBlackList.map((element) => delete objectElement[element])
        })

        let pDisplayCompanies = companiesDataArray.filter((item) => !compBlackList.includes(item))

        setKeyArray(pDisplayKeys)
        setCompanies(pDisplayCompanies)

        // console.log('pDisplayKeys', pDisplayKeys)
        // console.log('pDisplayCompanies', pDisplayCompanies)

    }


    



    // const fetchCompanies = async () => {
    //     const response = await fetch(`http://localhost:3000/companies`)
    //     const companiesArray = await response.json()

    //     let objKeys = Object.keys(companiesArray[0])

    //     let displayKeys = objKeys.filter((item) => !compBlackList.includes(item))

    //     companiesArray.map(objectElement => {
    //         compBlackList.map((element) => delete objectElement[element])
    //     })

    //     let displayCompanies = companiesArray.filter((item) => !compBlackList.includes(item))

    //     if (owner == "All") {
    //         setCompanies(displayCompanies)
    //     } else setCompanies(displayCompanies.filter(company => company.owner_name == owner))


    //     setKeyArray(displayKeys)
    // }

    // const newDisplayedCompanies = companies.filter(company => {
    //     return company.name.toLowerCase().includes(searchTerm.toLowerCase())
    // })

    // const fetchOwnerNames = async () => {
    //     const response = await fetch(`http://localhost:3000/users_names`)
    //     const ownersNamesArray = await response.json()
    //     setOwnersNames(ownersNamesArray)
    // }

    // useEffect(() => {
    //     fetchCompanies()
    //     fetchOwnerNames()
    // }, [owner])



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
        console.log('sortField, sortOrder', sortField, sortOrder)


        // if (sortField) {
        //     const sorted = [...companies].sort((a,b) => {
        //         return (
        //             a[sortField]?.toString().localeCompare(b[sortField]?.toString(), 'en', {
        //                 numeric: true,
        //             }) * (sortOrder === 'asc' ? 1 : -1)
        //         )
        //     })
        //     setCompanies(sorted)
        // }
    }

    console.log('companies', companies)
    console.log('keyArray', keyArray)


    const handleSortingChange = (sortColumn) => {
        const sortOrder =
        sortColumn === sortField && order === 'asc' ? 'desc' : 'asc'


        console.log('sortOrder', sortOrder)

        setSortField(sortColumn)
        setOrder(sortOrder)
        handleSorting(sortColumn, sortOrder)

    }

    // const [sortColumn, setSortColumn] = useState();
    // const [sortType, setSortType] = useState();


    console.log('order', order)
    console.log('sortField', sortField)

    const updateOwner = (e) => {
        setOwner(e.target.value)
    }


    const handleClick = (rowData) => {
        console.log('rowData', rowData)
        console.log('rowData.id', rowData.id)
        navigate(`/companies/${rowData.id}`)
    }

    return(
        <main className="main">
            <h1>Companies</h1>
            {/* <NavLink className='new-company-navlink' to='/companies/new' >
                <IconButton icon={<PlusIcon />}>Add New Company</IconButton>
            </NavLink> */}
            <div className="filter">
                {/* <label className='filterLabel'>Choose owner:</label> */}
                {/* <select name='ownersNames' id='ownersNames' onChange={updateOwner}>
                    <option value="All">All</option>
                    {ownersNames.map((ownerName, index) => {
                        return <option key={index} value={ownerName}>{ownerName}</option>
                    })}
                </select> */}
                {/* <div className="searchbar">
                    <input className='searchbox'
                    type='text'
                    id='search'
                    placeholder="search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div> */}
            </div>
            <Table
                className="table"
                showHeader={true}
                height={850}
                // width={1200}
                data={companies}
                onRowClick={rowData => {
                    handleClick(rowData)
                }}
                onSortColumn={handleSortingChange}
                bordered={true}
                cellBordered={true}
                fluid
            >
                {keyArray.map((key, index) => {
                    return (
                        <Column className="table-column" width={150} align="left" resizable sortable>
                            <HeaderCell className="table_header" key={index}>{key}</HeaderCell>
                            <Cell className="table-cell" dataKey={key} />
                        </Column>
                    )
                })}
                {/* <Column width={100} align="center" fixed>
                    <HeaderCell>id</HeaderCell>
                    <Cell dataKey="id" />
                </Column> */}

            </Table>
            {/* <table className="companies-table">
                <thead>
                    <tr>
                        {keyArray.map((key, index) => {
                            return (
                                <th key={index} onClick={() => handleSortingChange(key)}>{formatter(key)}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company=>{
                        let companyVals = Object.values(company)

                        return (
                            <tr onClick={() => handleClick(company.id)}>
                                {companyVals.map((val, index) => {
                                    return (
                                        <td key={index}>{val}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
            <PaginateCompanies pageCount={pageCount} getCompaniesForPage={getCompaniesForPage} data={companies}/>
        </main>
    )
}

export default CompaniesPage