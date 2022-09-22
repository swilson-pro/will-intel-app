import { useEffect, useState } from "react"

const CompaniesPage = () => {

    const blackList = ['description', 'logoUrl', 'pb_companyID', 'company_also_known_as', 'parent_company', 'company_legal_name', 'primary_industry_sector', 'primary_industry_group', 'primary_industry_code']

    const [companies, setCompanies] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const fetchCompanies = async () => {
        const response = await fetch(`http://localhost:3000/companies`)
        const companiesArray = await response.json()

        let objKeys = Object.keys(companiesArray[0])

        let displayKeys = objKeys.filter((item) => !blackList.includes(item))

        companiesArray.map(objectElement => {
            blackList.map((element) => delete objectElement[element])
        })

        let displayCompanies = companiesArray.filter((item) => !blackList.includes(item))

        setCompanies(displayCompanies)

        setKeyArray(displayKeys)
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

    useEffect(() => {
        fetchCompanies()
    }, [])



    console.log('companies', companies)
    console.log('keyArray', keyArray)
    return(
        <main>Companies Page
            <table className="companies-table">
                <thead>
                    <tr>
                        {keyArray.map((key) => {
                            return (
                                <th>{formatter(key)}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company=>{
                        let companyVals = Object.values(company)

                        return (
                            <tr>
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