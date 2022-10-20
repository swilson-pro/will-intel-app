import { useEffect, useState } from "react"

const EditProduct = ({id, fetchProduct}) => {

    const [companies, setCompanies] = useState([])

    const fetchCompanies = async () => {
        let req = await fetch(`http://localhost:3000/companies_names`)
        let res = await req.json()
        setCompanies(res)

    }

    useEffect(() => {
        fetchCompanies()
    }, [])

    const updateName = async (e) => {
        e.preventDefault()
        let newName = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: newName
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchProduct()
    }

    const updateBrand = async (e) => {
        e.preventDefault()
        let newBrand = e.target[0].value
        let req = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                brand: newBrand
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchProduct()
    }

    const updateCompany = async (e) => {
        e.preventDefault()
        console.log('companies', companies)
        console.log('e.target[0].value', e.target[0].value)
        const result = companies.find(company => {
            return company[1] == e.target[0].value;
        })
        console.log('result[0]', result[0])
        console.log('result[1]', result[1])

        let req = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                company_id: result[0]
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchProduct()
    }
    const updateProductLink = async (e) => {
        e.preventDefault()
        let newProductLink = e.target[0].value
        console.log('e')
        let req = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                product_link: newProductLink
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchProduct()
    }

    const updateWebsite = async (e) => {
        e.preventDefault()
        let newWebsite = e.target[0].value
        console.log('e')
        let req = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                website: newWebsite
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchProduct()
    }

    const updateDescription = async (e) => {
        e.preventDefault()
        let newDescription = e.target[0].value
        console.log('e')
        let req = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                description: newDescription
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchProduct()
    }

    return (
        <div>
            <form onSubmit={updateName}>
                <input type="text" placeholder="Update Name" />
                <input type="submit" value="Update Name" />
            </form>
            <form onSubmit={updateBrand}>
                <input type="text" placeholder="Update Brand" />
                <input type="submit" value="Update Brand" />
            </form>
            <form onSubmit={updateCompany}>
                <select>
                    {companies.map((company) => {
                        return <option key={company[0]} value={company[1]}>{company[1]}</option>
                    })}
                </select>
                <input type="submit" value="Update Company" />
            </form>
            <form onSubmit={updateProductLink}>
                <input type="text" placeholder="Update Product Link" />
                <input type="submit" value="Update Product Link" />
            </form>
            <form onSubmit={updateWebsite}>
                <input type="text" placeholder="Update Website" />
                <input type="submit" value="Update Website" />
            </form>
            <form onSubmit={updateDescription}>
                <input type="text" placeholder="Update Description" />
                <input type="submit" value="Update Description" />
            </form>
        </div>
    )
}

export default EditProduct