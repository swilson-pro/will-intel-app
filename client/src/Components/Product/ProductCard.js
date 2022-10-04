import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditProduct from "./EditProduct"

import {Button, ButtonToolbar, IconButton} from 'rsuite';
import {Visible, Unvisible, Others, UserBadge, Plus} from '@rsuite/icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faEraser, faUserPen, faBuilding, faPencil } from '@fortawesome/free-solid-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'

import Moment from 'moment';

const ProductCard = () => {

    let user = {id: 1}

    const [isEditClicked, setIsEditClicked] = useState(false)

    let {id} = useParams()

    let navigate = useNavigate()

    const [product, setProduct] = useState({})

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")

    const fetchProduct = async() => {
        const response = await fetch(`http://localhost:3000/products/${id}`)
        const productObj = await response.json()
        console.log(productObj)
        setProduct(productObj)
        let reverseOrderNotes = productObj.notes.reverse()
        setNotes(reverseOrderNotes)
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

    const handleProductClick = (id) => {
        console.log('clicked', id)
        navigate(`/products/${id}`)
        window.location.reload(false)
    }

    const handleAddNote = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: newNote,
                notable_id: product.id,
                notable_type: "Product",
                user_id: user.id

            })
        })
        fetchProduct()
        setNewNote("")
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
                        <button onClick={handleAddNote} className="note-button">
                            <span className="note_button_icon">
                                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                            </span>
                            <span className="note_button_text">Add Note</span>
                        </button>
                        <textarea placeholder=" write note..." className="note-input" value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
                    </form>
                        <h2>Note</h2>
                        <hr></hr>
                        <div className="notes">
                        {notes?.map((note) => {
                                return (
                                <div key={note.id} className="note-div">
                                    {/* <p className="note-timestamp">{`${note.created_at.substring(0, 10)} | ${note.user_name}`}</p> */}
                                    <p className="note-timestamp">{`${Moment(note.created_at).format('MMMM DD, LT')} | ${note.user_name}`}</p>
                                    <p className="note">{note.content}</p>
                                </div>
                                )
                            })}


                        </div>
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
                            <summary>Other Products from this company</summary>

                            {console.log('product', product)}
                            {console.log('product.id', product.id)}
                            {console.log('product.company_products', product.company_products)}
                            {/* {product.company_products?.map(item => {
                                console.log('item', item)
                            })} */}
                            {product.company_products?.filter(item => item.id !== product.id).map(filteredProduct => {
                                console.log('filteredProduct.id', filteredProduct.id)
                                // console.log('filteredProduct.name', filteredProduct.name)
                                return (
                                    <li key={filteredProduct.id} onClick={() => handleProductClick(filteredProduct.id)}>{filteredProduct.name}</li>
                                )
                            })}
                            {/* {product.company_products?.map(item => 
                                console.log('item', item)
                            )} */}
                        </details>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCard