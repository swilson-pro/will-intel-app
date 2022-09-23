import { useState } from "react"
import NewCompany from "../Companies/NewCompany"

const NewProduct = () => {

    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [company, setCompany] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [website, setWebsite] = useState('')

    const handleProductSubmit = async (e) => {
        e.preventDefault()
        console.log('product: ', {name, brand, company, price, image, website})

        let req = await fetch(`http://localhost:3000/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                brand: brand,
                input_company_name: company, 
                price: price,
                image_link: image,
                website: website,
            })
        })
        setName('')
        setBrand('')
        setCompany('')
        setPrice('')
        setImage('')
        setWebsite('')
    }

    return (
        <div className="new-product-div">
            <h2>New Product</h2>
            <form className="new-product-form" onSubmit={handleProductSubmit}>
                <input className='input' type='text' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input className='input' type='text' name='brand' placeholder='Brand' value={brand} onChange={(e) => setBrand(e.target.value)}/>
                <input className='input' type='text' name='company' placeholder='Company' value={company} onChange={(e) => setCompany(e.target.value)}/>
                <input className='input' type='number' name='price' placeholder='Price' value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}/>
                <input className='input' type='text' name='image' placeholder='Image URL' value={image} onChange={(e) => setImage(e.target.value)}/>
                <input className='input' type='text' name='website' placeholder='Website' value={website} onChange={(e) => setWebsite(e.target.value)}/>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default NewProduct