import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContactCard from "../Contact/ContactCard";
import { useNavigate } from "react-router-dom";
import EditCompany from "./EditCompany";

const CompanyCard = () => {

    let navigate = useNavigate()

    let {id} = useParams()

    const [company, setCompany] = useState({})
    const [isEditClicked, setIsEditClicked] = useState(false)

    const fetchCompany = async () => {
        const response = await fetch(`http://localhost:3000/companies/${id}`)
        const companyObj = await response.json()
        console.log('companyObj', companyObj)
        setCompany(companyObj)
    }

    useEffect(() => {
        fetchCompany()
    },[])

    const updateCompany = async () => {
        setIsEditClicked(!isEditClicked)
    }

    const deleteCompany = async (id) => {
        console.log('clicked', id)
        let req = await fetch(`http://localhost:3000/companies/${id}`, {
            method: "DELETE",
        })
        .then(alert("Company Deleted"))
        backToCompanies()
    }

    const backToCompanies = () => {
        navigate(`/companies`)
    }

    const handleProductClick = (id) => {
        console.log('clicked', id)
        navigate(`/products/${id}`)
    }

    const handleContactClick = (id) => {
        console.log('clicked', id)
        navigate(`/contacts/${id}`)
    }

    console.log('company', company)
    return (
        <div className="company-card">
            <div className="main">
                <button onClick={() => deleteCompany(company.id)}>Delete Company</button>
                <button onClick={updateCompany}>Update Company Details</button>
                <div className="left">
                    <div className="left-head">
                        <img src={company.logoUrl} width='100' height='100'></img>
                        <h2>{company.name}</h2>
                        <h4>{<a href={company.website} target="_blank">{company.website}</a>}</h4>
                        <h4>Linkedin: {<a href={company.linkedin_regularCompanyUrl} target="_blank">{company.linkedin_regularCompanyUrl}</a>}</h4>
                        <h4>{company.description}</h4>
                        <div className="left-bottom">
                            <h3>Company Products</h3>
                            <ul className="company-products">
                                {company.products?.map((product) => {
                                    return <li key={product.id} onClick={() => handleProductClick(product.id)}>{product.name}</li>
                                })}
                            </ul>
                            <h3>Contacts at Company</h3>
                            <ul className="contacts-at-company">
                                {company.contacts?.map((contact) => {
                                    return <li key={contact.id} onClick={() => handleContactClick(contact.id)}>{contact.name}</li>
                                })}
                            </ul>
                        </div>
                        <hr></hr>
                        {isEditClicked ? <EditCompany id={id} fetchCompany={fetchCompany}/> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard