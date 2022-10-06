import { useEffect, useState, forwardRef, useRef } from "react"
import { Navigate } from "react-router-dom"
import ProductsPage from "../Product/ProductsPage"

import { useNavigate } from "react-router-dom"

import { SchemaModel, StringType } from "schema-typed"

import { Form, Input, ButtonToolbar, Button } from 'rsuite';

import { Message, useToaster } from 'rsuite'

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


const NewUser = () => {

  let navigate = useNavigate()

  const [form, setForm] = useState({})

  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     // console.log('form inside handlesubmit', form)
  //     fetch("http://localhost:3000/users", {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(form)
  //     })
  //     .then(response => {
  //         if (response.ok) {
  //             return response.json();
  //         } else {
  //             throw new Error('something wrong');
  //         }
  //     })
  //     .then (result => {
  //         // console.log('result', result)
  //         alert('Account Created')
  //         navigate(`/login`)
  //     })
  //     .catch(error => alert(error.response.data))


  // }

  // const updateForm = (e) => {
  //     // console.log('e.target.name', e.target.name)
  //     // console.log('e.target.value', e.target.value)
  //     setForm({
  //         ...form,
  //         [e.target.name]: e.target.value
  //     })
  // }



  // R Suite Below

  const toaster = useToaster()

  const message = (
    <Message showIcon type="success">
      Account created. Login to Carlson
    </Message>
  )

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: ""
  })

  let defaultFormValue = {
    name: "",
    email: "",
    password: ""
  }

  const formRef = useRef()

  const model = SchemaModel({
    name: StringType().isRequired("Full name is required"),
    // company_name: StringType().isRequired("Company Name Required"),
    email: StringType().isEmail("Valid Email Address is required").isRequired("Email Required"),
    // textarea: StringType().isRequired("A MESSAGE MUST BE ENTERED!")
    password: StringType().isRequired("set your password")
  })

  const formClick = async () => {
    if (!formRef.current.check()) {
      console.error('form error');
      return;
    }
    console.log('formValue on click', formValue)
    let fName = formValue.name
    let fEmail = formValue.email
    let fPassword = formValue.password

    console.log('input data', `name: ${fName}, email: ${fEmail}, password: ${fPassword}`)

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('something wrong');
        }
      })
      .then(result => {
        // console.log('result', result)
        setFormValue(defaultFormValue)
        toaster.push(message)
        navigate(`/login`)
      })
      .catch(error => alert(error.response.data))

  }

  console.log('formValue', formValue)

  console.log('form', form)


  return (
    <>
      <h1 style={{ textAlign: "center", margin: 40 }}>New Account</h1>
      <Form
        style={{margin: 40}}
        ref={formRef}
        model={model}
        formValue={formValue}
        onChange={formValue => setFormValue(formValue)}
        onSubmit={formClick}
        fluid

      >
        <Form.Group controlId="name">
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="name" />
          <Form.HelpText>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" type="email" />
          <Form.HelpText tooltip>Required</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control name="password" type="password" autoComplete="off" />
        </Form.Group>
        {/* <Form.Group controlId="textarea-6">
          <Form.ControlLabel>Textarea</Form.ControlLabel>
          <Form.Control name="textarea" rows={5} accepter={Textarea} />
        </Form.Group> */}
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="ghost" type='submit'>Submit</Button>
            <Button appearance="ghost">Cancel</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>

    </>

    // <div>
    //     <h1>new user form</h1>
    //     <form
    //         onSubmit={handleSubmit}
    //     >
    //         <input 
    //             onChange={updateForm}
    //             name="name"
    //             type="text"
    //             placeholder="name"
    //         />
    //         <input 
    //             onChange={updateForm}
    //             name="email"
    //             type="text"
    //             placeholder="email"
    //         />
    //         <input 
    //             onChange={updateForm}
    //             name="password"
    //             type="password"
    //             placeholder="password"
    //         />
    //         <input type="submit"/>
    //     </form>
    // </div>
  )
}

export default NewUser