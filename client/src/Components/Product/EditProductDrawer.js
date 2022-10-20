import { Drawer, Form, SelectPicker } from "rsuite"

import AngleLeftIcon from '@rsuite/icons/legacy/AngleRight';

import { RadioGroup, Radio, ButtonToolbar, Button, IconButton, Placeholder, Input, InputGroup } from 'rsuite';

import { useEffect, useState } from 'react';

import { forwardRef, useRef } from "react"

import { SchemaModel, StringType } from "schema-typed"

import { Popover, Whisper } from 'rsuite';

import { Message, useToaster } from 'rsuite'

import EditIcon from '@rsuite/icons/Edit';

const EditProductDrawer = ({ product, fetchProduct }) => {
    const [size, setSize] = useState('lg');
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();

    const [products, setProducts] = useState([])
    const [productsNames, setProductsNames] = useState([])
    const [value, setValue] = useState(null)
    const [ownerVal, setOwnerVal] = useState(null)
    const [owners, setOwners] = useState([])
    const [ownersNames, setOwnersNames] = useState([])

    const handleOpen = key => {
        setOpen(true);
        setPlacement(key);
    };

    //   NAME
    const [fNameVal, setFNameVal] = useState({
        name: ""
    })

    const nameModel = SchemaModel({
        name: StringType().isRequired("Name is required")
    })


    const formRef = useRef()


    const fNameClick = async () => {


        console.log('fNameVal', fNameVal)
        let req = await fetch(`http://localhost:3000/api/products/${product.id}`, {
            method: "PATCH",
            body: JSON.stringify(fNameVal),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchProduct()
        setFNameVal(defaultFNameVal)
    }

    const defaultFNameVal = {
        name: ""
    }

    //   website
    const [fWebsiteVal, setFWebsiteVal] = useState({
        website: ""
    })

    const websiteModel = SchemaModel({
        website: StringType().isRequired("website is required")
    })

    const fWebsiteClick = async () => {


        console.log('fWebsiteVal', fWebsiteVal)
        let req = await fetch(`http://localhost:3000/api/products/${product.id}`, {
            method: "PATCH",
            body: JSON.stringify(fWebsiteVal),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchProduct()
        setFWebsiteVal(defaultWebsiteVal)
    }

    const defaultWebsiteVal = {
        website: ""
    }


        //   IMAGE
        const [fImageVal, setFImageVal] = useState({
            image_link: ""
        })
    
        const imageModel = SchemaModel({
            image_link: StringType().isRequired("image url is required")
        })
    
        const fImageClick = async () => {
    
    
            console.log('fImageVal', fImageVal)
            let req = await fetch(`http://localhost:3000/api/products/${product.id}`, {
                method: "PATCH",
                body: JSON.stringify(fImageVal),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            fetchProduct()
            setFImageVal(defaultFImageVal)
        }
    
        const defaultFImageVal = {
            image_link: ""
        }

        // products

        const [fProductVal, setFProductVal] = useState({
            product_id: ""
        })
    
        const productModel = SchemaModel({
            product_id: StringType().isRequired("website is required")
        })



    return (
        <>

            <hr />
            <ButtonToolbar>
                <IconButton appearance="ghost" color="blue" icon={<AngleLeftIcon />} onClick={() => handleOpen('left')}>
                    Edit Product
                </IconButton>
            </ButtonToolbar>
            <Drawer size='lg' placement={placement} open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>Edit Product</Drawer.Title>
                    <Drawer.Actions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => setOpen(false)} appearance="primary">
                            Confirm
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body>

                    {/* <InputGroup>
    <Input placeholder="Name" />
    <InputGroup.Button onClick={updateName}>
    <EditIcon/>
    </InputGroup.Button>
  </InputGroup> */}

                    {/* NAME */}

                    <p>Product Name: {product.name}</p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={nameModel}
                        formValue={fNameVal}
                        onChange={fNameVal => setFNameVal(fNameVal)}
                        onSubmit={fNameClick}
                        fluid
                    >
                        <Form.Group controlId='name'>
                            <Form.ControlLabel>{product.name}</Form.ControlLabel>
                            <Form.Control name='name' />
                            <Form.HelpText tooltip>Product Name is required</Form.HelpText>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>
                    <p>Website: {product.website}</p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={websiteModel}
                        formValue={fWebsiteVal}
                        onChange={fWebsiteVal => setFWebsiteVal(fWebsiteVal)}
                        onSubmit={fWebsiteClick}
                        fluid
                    >
                        <Form.Group controlId='website'>
                            <Form.ControlLabel>{product.website}</Form.ControlLabel>
                            <Form.Control name='website' />
                            <Form.HelpText tooltip>Website is required</Form.HelpText>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>
                    <p>Image: <a src={product.image_link}>Link</a></p>
                    <Form
                        style={{ margin: 40 }}
                        ref={formRef}
                        model={imageModel}
                        formValue={fImageVal}
                        onChange={fImageVal => setFImageVal(fImageVal)}
                        onSubmit={fImageClick}
                        fluid
                    >
                        <Form.Group controlId='image'>
                            <Form.ControlLabel></Form.ControlLabel>
                            <Form.Control name='image' />
                            <Form.HelpText tooltip>Image URL is required</Form.HelpText>
                        </Form.Group>
                        <ButtonToolbar>
                            <Whisper
                                placement='right'
                                trigger='active'
                                speaker={<Popover arrow={false}>Clicked</Popover>}>
                                <Button appearance='ghost' type='submit'>
                                    Submit
                                </Button>
                            </Whisper>
                        </ButtonToolbar>
                    </Form>


                </Drawer.Body>
            </Drawer>
        </>
    )
}

export default EditProductDrawer