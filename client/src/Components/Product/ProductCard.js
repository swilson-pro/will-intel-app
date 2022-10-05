import { useParams } from "react-router-dom"
import { useEffect, useState, useRef, forwardRef } from "react"
import { useNavigate } from "react-router-dom"
import EditProduct from "./EditProduct"

import { Button, ButtonToolbar, IconButton, Form, Input, Popover, Whisper } from 'rsuite';
import { Visible, Unvisible, Others, UserBadge, Plus, Calendar, Trash, Edit, Project } from '@rsuite/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faEraser, faUserPen, faBuilding, faPencil } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faProductHunt } from '@fortawesome/free-brands-svg-icons'

import Moment from 'moment';

import { useSelector } from 'react-redux'

import { SchemaModel, StringType } from "schema-typed"

import ProductDescriptionModal from "./ProductDescriptionModal";

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const ProductCard = () => {

    const user = useSelector((state) => state.user).profile;

    const formRef = useRef()

    console.log('user', user)

    const [isEditClicked, setIsEditClicked] = useState(false)

    let { id } = useParams()

    let navigate = useNavigate()

    const [product, setProduct] = useState({})

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")

    const fetchProduct = async () => {
        const response = await fetch(`http://localhost:3000/products/${id}`)
        const productObj = await response.json()
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

    const model = SchemaModel({
        textarea: StringType().isRequired("Note must have content.")
    })

    const formClick = async () => {
        if (!formRef.current.check()) {
            console.error("FORM ERROR!");
            return;
        }
        console.log('formValue', formValue)
        let req = await fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: formValue.textarea,
                notable_id: product.id,
                notable_type: "Product",
                user_id: user.id

            })
        })
        fetchProduct()
        setFormValue(defaultFormValue)
    }

    const defaultFormValue = {
        textarea: ''
    };

    const [formValue, setFormValue] = useState({
        textarea: ""
    })

    console.log('id', id)
    return (
        <div className="card">
            <ButtonToolbar>
                <IconButton
                    className="card-button"
                    color="blue"
                    appearance="ghost"
                    size="md"
                    icon={<Trash />}
                    onClick={() => deleteProduct(product.id)}
                >
                    Delete Product
                </IconButton>
                <IconButton
                    className="card-button"
                    color="blue"
                    appearance="ghost"
                    size="md"
                    icon={<Edit />}
                    onClick={() => updateProduct(product.id)}
                >
                    Edit Product
                </IconButton>
            </ButtonToolbar>
            <div className="profile-details">
                <div className="pd-left">
                    <div className="pd-row">
                        <div className="image-div">
                            {!product.image_link ?
                                <img className='pd-image' src={`https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`} alt={product.name} onClick={() => handleCompanyClick(product.company_id)}></img>
                                : <img className='pd-image' src={product.image_link} alt={product.name} onClick={() => handleCompanyClick(product.company_id)}></img>}
                            <div className="a-tag-div">

                                <a href={product.product_link} target="_blank"><FontAwesomeIcon icon={faProductHunt}></FontAwesomeIcon></a>
                            </div>
                            <div className="modal-div">
                                {!product.description ? null : <ProductDescriptionModal product={product} />}

                            </div>
                        </div>
                        <div className="general-info">
                            <h3>{product.name}</h3>
                            <h3>Brand: {product.brand}</h3>
                            <h4><a href={product.website} target="_blank">{product.website}</a></h4>
                            <h3 onClick={() => handleCompanyClick(product.company_id)}>{product.company_name}</h3>
                        </div>
                    </div>
                    <hr></hr>
                    {isEditClicked ? <EditProduct id={id} fetchProduct={fetchProduct} /> : null}
                </div>
                <div className="pd-mid">
                    <Form
                        ref={formRef}
                        model={model}
                        formValue={formValue}
                        onChange={formValue => setFormValue(formValue)}
                        onSubmit={formClick}
                        style={{ margin: 10 }}
                        fluid
                    >
                        <Form.Group controlId="textarea">
                            <Form.ControlLabel>Note</Form.ControlLabel>
                            <Form.Control name="textarea" rows={10} accepter={Textarea} placeholder="write note..." ></Form.Control>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement="right"
                                trigger="active"
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit' >
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>

                    </Form>
                    <h2>Note</h2>
                    <hr></hr>
                    <div className="notes">
                        {notes?.map((note) => {
                            return (
                                <div key={note.id} className="note-div">
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
                        <img onClick={() => handleCompanyClick(product.company_id)} className="product-company-logo" src={product.company_logo} alt={product.company_name}></img>
                        <details className="colleagues">
                            <summary>Associated Contacts</summary>
                            {product.company_contacts?.map((contact) => {
                                return <li key={contact.id} onClick={() => handleContactClick(contact.id)}>{contact.name}</li>
                            })}
                        </details>
                        <details className="company-products">
                            <summary>Other Products from this company</summary>

                            {product.company_products?.filter(item => item.id !== product.id).map(filteredProduct => {
                                return (
                                    <li key={filteredProduct.id} onClick={() => handleProductClick(filteredProduct.id)}>{filteredProduct.name}</li>
                                )
                            })}
                        </details>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCard