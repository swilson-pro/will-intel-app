import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContactCard from "../Contact/ContactCard";

const CompanyCard = () => {

    let {id} = useParams()

    console.log('id', id)

    const [company, setCompany] = useState({})

    const fetchCompany = async () => {
        const response = await fetch(`http://localhost:3000/companies/${id}`)
        const companyObj = await response.json()
        console.log('companyObj', companyObj)
        setCompany(companyObj)
    }

    useEffect(() => {
        fetchCompany()
    },[])

    console.log('company', company)
    return (
        <div className="company-card">
            <div className="main">
                <div className="left">
                    <div className="left-head">
                        <img src={company.logoUrl} width='100' height='100'></img>
                        <h2>{company.name}</h2>
                        <h4>{<a href={company.website} target="_blank">{company.website}</a>}</h4>
                        <h4>Linkedin: {<a href={company.linkedin_regularCompanyUrl} target="_blank">{company.linkedin_regularCompanyUrl}</a>}</h4>
                        <h4>{company.description}</h4>
                        <div className="left-bottom">
                            <ul className="company-products">
                                {company.products?.map((product) => {
                                    return <li>{product.name}</li>
                                })}
                            </ul>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard