import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditProduct from "./EditProduct"

import {Button, ButtonToolbar, IconButton} from 'rsuite';
import {Visible, Unvisible, Others, UserBadge, Plus} from '@rsuite/icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faEraser, faUserPen, faBuilding, faPencil } from '@fortawesome/free-solid-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'

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

    const updateProduct = async () => {
        setIsEditClicked(!isEditClicked)
    }

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
            <ButtonToolbar>
                <IconButton
                    color="blue"
                    appearance="ghost"
                    size="md"
                    icon={<Plus/>}
                    onClick={() => deleteProduct(product.id)}
                    >
                        Delete Product
                </IconButton>
                <IconButton
                    color="blue"
                    appearance="ghost"
                    size="md"
                    icon={<Plus/>}
                    onClick={() => updateProduct(product.id)}
                    >
                        Edit Product
                </IconButton>
            </ButtonToolbar>
            {/* <button onClick={() => deleteProduct(product.id)}>Delete Product</button>
            <button onClick={() => updateProduct(product.id)}>Update Product</button> */}
            <div className="profile-details">
                <div className="pd-left">
                    <div className="pd-row">
                        <img className='pd-image' src={product.image_link} alt={product.name} onClick={() => handleCompanyClick(product.company_id)}></img>
                        <div>
                            <h3>{product.name}</h3>
                            <h3>Brand: {product.brand}</h3>
                            <h3 onClick={() => handleCompanyClick(product.company_id)}>{product.company_name}</h3>
                            <h4>{<a href={product.website} target="_blank">{product.website}</a>}</h4>
                            <h4>{<a href={product.product_link} target="_blank">{product.product_link}</a>}</h4>
                        </div>
                        <div className="left-body">
                            <details>
                                <summary>Product Description</summary>
                                <p>Description: {product.description}</p>
                            </details>
                        </div>
                    </div>


                    <hr></hr>
                    {isEditClicked ? <EditProduct id={id} fetchProduct={fetchProduct} /> : null}
                </div>
                <div className="pd-mid">
                        <form className="note-form">
                            <button className="note-button">
                                <span className="note_button_icon">
                                    <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                                </span>
                            </button>
                            <textarea placeholder=" write note..." className="note-input" />
                        </form>
                        <h2>Note</h2>
                        <hr></hr>
                        <div className="notes">
                        <div className="note-div">
                            <p className="note-timestamp">march 11, 2021, 3PM | Ben</p>
                            <p className="note">Here's your note...</p>
                        </div>
                    </div>
                </div>
                <div className="pd-right">
                    <h3>More Info</h3>
                    <div className="pd-row">
                        <details className="colleagues">
                            <summary>Associated Contacts</summary>
                            {product.company_contacts?.map((contact) => {
                                return <li key={contact.id} onClick={() => handleContactClick(contact.id)}>{contact.name}</li>
                            })}
                        </details>
                        <details className="company-products">
                            <summary>Other Products this company</summary>
                            {product.company_products?.map((contact) => {
                                return <li key={contact.id} onClick={() => handleContactClick(contact.id)}>{contact.name}</li>
                            })}
                        </details>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCard