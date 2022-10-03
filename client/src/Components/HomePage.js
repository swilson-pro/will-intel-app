import { useEffect, useState } from "react"
import ContactsPage from "./Contact/ContactsPage"

const HomePage = () => {

    const [contactCount, setContactCount] = useState()
    const [companyCount, setCompanyCount] = useState()
    const [productCount, setProductCount] = useState()

    const getContactsCount = async () => {
        const res = await fetch(`http://localhost:3000/count_contacts`)
        const count = await res.json()
        setContactCount(count)
    }

    const getCompaniesCount = async () => {
        const res = await fetch(`http://localhost:3000/count_companies`)
        const count = await res.json()
        setCompanyCount(count)
    }

    const getProductsCount = async () => {
        const res = await fetch(`http://localhost:3000/count_products`)
        const count = await res.json()
        setProductCount(count)
    }

    useEffect(() => {
        getContactsCount()
        getCompaniesCount()
        getProductsCount()
    }, [])

    console.log('contactCount', contactCount)

    return (
        <main>
            <div className="company-aggregates">
                <h3>Company Stats</h3>
                    <h4>Contacts:  {contactCount}</h4>
                    <h4>Companies: {companyCount}</h4>
                    <h4>Products: {productCount}</h4>
            </div>
            {/* <div className="user-aggregates">
                <h3>User Stats</h3>
                    <h4>Contacts: {"value"}</h4>
                    <h4>Companies: {"value"}</h4>
                    <h4>Deals: {"value"}</h4>
                    <h4>Products: {"value"}</h4>
            </div> */}
        </main>
    )
}

export default HomePage