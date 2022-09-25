import { useEffect, useState } from "react"
import { Navigate, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const CompaniesPage = ({compBlackList}) => {

    // const compBlackList = ['description', 'logoUrl', 'pb_companyID', 'company_also_known_as', 'parent_company', 'company_legal_name', 'primary_industry_sector', 'primary_industry_group', 'primary_industry_code']

    let navigate = useNavigate()

    const [ownersNames, setOwnersNames] = useState([])
    const [owner, setOwner] = useState("All")

    const [companies, setCompanies] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const [sortField, setSortField] = useState('')
    const [order, setOrder] = useState('')

    const fetchCompanies = async () => {
        const response = await fetch(`http://localhost:3000/companies`)
        const companiesArray = await response.json()

        let objKeys = Object.keys(companiesArray[0])

        let displayKeys = objKeys.filter((item) => !compBlackList.includes(item))

        companiesArray.map(objectElement => {
            compBlackList.map((element) => delete objectElement[element])
        })

        let displayCompanies = companiesArray.filter((item) => !compBlackList.includes(item))

        setCompanies(displayCompanies)

        setKeyArray(displayKeys)
    }

    const newDisplayedCompanies = companies.filter(company => {
        return company.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const fetchOwnerNames = async () => {
        const response = await fetch(`http://localhost:3000/users_names`)
        const ownersNamesArray = await response.json()
        setOwnersNames(ownersNamesArray)
    }

    useEffect(() => {
        fetchCompanies()
        fetchOwnerNames()
    }, [])



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

        if (sortField) {
            const sorted = [...companies].sort((a,b) => {
                return (
                    a[sortField]?.toString().localeCompare(b[sortField]?.toString(), 'en', {
                        numeric: true,
                    }) * (sortOrder === 'asc' ? 1 : -1)
                )
            })
            setCompanies(sorted)
        }
    }

    const handleSortingChange = (field) => {
        const sortOrder =
        field === sortField && order === 'asc' ? 'desc' : 'asc'


        console.log('field', field)
        console.log('sortOrder', sortOrder)
        setSortField(field)
        setOrder(sortOrder)
        handleSorting(field, sortOrder)

    }


    const handleClick = (id) => {
        console.log('clicked: ', id)
        navigate(`/companies/${id}`)
    }
    console.log('companies', companies)
    console.log('keyArray', keyArray)
    return(
        <main className="main">
            <NavLink className='new-company-navlink' to='/companies/new' >
                <button className='new-company'>Create New Company</button>
            </NavLink>
            <div className="filter">
                <label className='filterLabel'>Choose owner:</label>
                <select name='ownersNames' id='ownersNames'>
                    <option value="All">All</option>
                    {ownersNames.map((ownerName) => {
                        return <option value={ownerName}>{ownerName}</option>
                    })}
                </select>
                <div className="searchbar">
                    <input className='searchbox'
                    type='text'
                    id='search'
                    placeholder="search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <h4>Total: {companies.length}</h4>
            </div>
            <table className="companies-table">
                <thead>
                    <tr>
                        {keyArray.map((key) => {
                            return (
                                <th onClick={() => handleSortingChange(key)}>{formatter(key)}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {newDisplayedCompanies.map(company=>{
                        let companyVals = Object.values(company)

                        return (
                            <tr onClick={() => handleClick(company.id)}>
                                {companyVals.map(val => {
                                    return (
                                        <td>{val}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}

export default CompaniesPage