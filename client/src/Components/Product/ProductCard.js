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

import ProdContactsDrawer from "./ProdContactsDrawer";
import OtherProductsDrawer from "./OtherProductsDrawer";

import ProductOptionsModal from "./ProductOptionsModal";

import {Loader} from 'rsuite'


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

    const [company, setCompany] = useState({})

    const [compLoading, setCompLoading] = useState(true)
    const [prodLoading, setProdLoading] = useState(true)


    const fetchProduct = async () => {
        const response = await fetch(`http://localhost:3000/api/products/${id}`)
        const productObj = await response.json()
        setProduct(productObj)
        setProdLoading(false)
        let reverseOrderNotes = productObj.notes.reverse()
        setNotes(reverseOrderNotes)
    }

    const fetchCompany = async () => {
        const response = await fetch(`http://localhost:3000/api/companies/${product.company_id}`)
        const companyObj = await response.json()
        setCompany(companyObj)
        setCompLoading(false)
    }

    console.log('product.company_id', product.company_id)
    console.log('company', company)

    useEffect(() => {
        fetchProduct()
    }, [])

    useEffect(() => {
        fetchCompany()
    }, [product])

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
        let req = await fetch(`http://localhost:3000/api/products/${id}`, {
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
    console.log('compLoading', compLoading)
    return (
        <div className="card">
            <ProductOptionsModal product={product} fetchProduct={fetchProduct} deleteProduct={deleteProduct} />
            <h5 className="card-header">Product</h5>
            <div className="profile-details">
                <div className="pd-left">
                    <div className="pd-row">
                        <div className="image-div">
                            {prodLoading ? <Loader center={true} className='image-loader' size='lg' content='Loading...'/> : !product.image_link ?
                                <img className='pd-image' src={`https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`} alt={product.name}></img>
                                : <img className='pd-image' src={product.image_link} onError={(e) => (e.currentTarget.src = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg')} alt={product.name}></img>}

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
                            <h3 className="company-name" onClick={() => handleCompanyClick(product.company_id)}>{product.company_name}</h3>
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
                        {compLoading ? <Loader center={false} className='image-loader' size='lg' content='Loading...'/>
                         : !product.company_logo ? <img onClick={() => handleCompanyClick(product.company_id)} className="company-logo" src={`https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`} alt={product.company_name}></img>
                     : <img onClick={() => handleCompanyClick(product.company_id)} className="company-logo" src={product.company_logo} onError={(e) => (e.currentTarget.src = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg')} alt={product.company_name}></img>}
                    {/* {!product.company_logo ? <img onClick={() => handleCompanyClick(product.company_id)} className="company-logo" src={`https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`} alt={product.company_name}></img>
                     : <img onClick={() => handleCompanyClick(product.company_id)} className="company-logo" src={product.company_logo} onError={(e) => (e.currentTarget.src = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg')} alt={product.company_name}></img>} */}
                        <div className="company-name">
                            <span>
                                <FontAwesomeIcon className="span-icon" icon={faBuilding}></FontAwesomeIcon>
                            </span>
                            <span>
                                <p className="span-content" onClick={() => handleCompanyClick(product.company_id)}>{product.company_name}</p>
                            </span>

                        </div>

                        
                        <ProdContactsDrawer company={company} handleContactClick={handleContactClick}/>

                        <OtherProductsDrawer product={product} handleProductClick={handleProductClick} />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCard