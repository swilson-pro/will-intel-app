import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ProductCard = () => {

    const [isEditClicked, setIsEditClicked] = useState(false)

    let {id} = useParams()

    let navigate = useNavigate()

    const [product, setProduct] = useState({})

    const fetchProduct = async() => {
        const response = await fetch(`http://localhost:3000/products/${id}`)
        const productObj = await response.json()
        console.log(productObj)
        setProduct(productObj)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleCompanyClick = (id) => {
        console.log('clicked')
        navigate(`/companies/${id}`)
    }

    const handleContactClick = (id) => {
        navigate(`/contacts/${id}`)
    }

    const deleteProduct = async (id) => {
        let req = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
        })
        .then(alert("Product Deleted"))
        backToProducts()
    }

    const backToProducts = () => {
        navigate(`/products`)
    }

console.log('id', id)
console.log('product', product)
    return (
        <div className="product-card">
            <button onClick={() => deleteProduct(product.id)}>Delete Product</button>
            <div className="left">
                <div className="left-head">
                    <img src={product.image_link} alt={product.name} width='100px' height='100px' onClick={() => handleCompanyClick(product.company_id)}></img>
                    <h2>{product.name}</h2>
                    <h1>{product.brand}</h1>
                    <h2 onClick={() => handleCompanyClick(product.company_id)}>{product.company_name}</h2>
                    <h2>{<a href={product.product_link} target="_blank">{product.product_link}</a>}</h2>
                    <h2>{<a href={product.website} target="_blank">{product.website}</a>}</h2>
                    <p>{product.description}</p>
                    <ul>associated contacts
                        {product.company_contacts?.map((contact) => {
                            return <li key={contact.id} onClick={() => handleContactClick(contact.id)}>{contact.name}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductCard