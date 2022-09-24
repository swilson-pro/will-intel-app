import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const ProductCard = () => {

    let {id} = useParams()

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

console.log('id', id)
console.log('product', product)
    return (
        <div className="product-card">
            <div className="left">
                <div className="left-head">
                    <img src={product.image_link} alt={product.name} width='100px' height='100px'></img>
                    <h2>{product.name}</h2>
                    <h1>{product.brand}</h1>
                    <h2>{product.company_name}</h2>
                    <h2>{<a href={product.product_link} target="_blank">{product.product_link}</a>}</h2>
                    <h2>{<a href={product.website} target="_blank">{product.website}</a>}</h2>
                </div>
            </div>
        </div>
    )
}

export default ProductCard