import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'

import { useNavigate } from "react-router-dom"

import { SchemaModel, StringType } from "schema-typed"

import { setUser, logout } from '../../features/user/user'

import { Form, Button, ButtonToolbar } from 'rsuite'

import {Message, useToaster} from 'rsuite'



const Login = () => {

    const user = useSelector((state) => state.user);

    console.log('user', user)

    console.log('user.isLoggedIn', user.isLoggedin)

    let token = localStorage.getItem("jwt");

    console.log('token', token)

    let navigate = useNavigate()

    const dispatch = useDispatch()
    const [form, setForm] = useState({})

    let handleSubmit = (e) => {
        e.preventDefault()
        console.log('form', form)
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    alert("something went wrong")
                }
            })
            .then((data) => {
                console.log('data', data)
                localStorage.setItem("jwt", data.token);
                dispatch(setUser(data.user))
            })
            .catch(error => alert(error.res.data))
    };


    let updateForm = (e) => {
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        let token = localStorage.getItem("jwt");
        console.log('token', token)
        if (token && !user.isLoggedin) {
            fetch("http://localhost:3000/api/profile", {
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('useEffect data', data)
                    navigate(-1)
                    dispatch(setUser(data))
                });
        }
    }, [])

    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    })

    console.log('form', form)
    console.log('formValue', formValue)
    console.log('user', user)

    const handleClick = () => {
        navigate(`/newuser`)
    }

    const toaster = useToaster()

    const message = (
        <Message showIcon type="success">
            Your Dashboard
        </Message>
    )


    let defaultFormValue = {
        email: "",
        password: ""
    }

    const formRef = useRef()

    const model = SchemaModel({
        email: StringType().isEmail("Email Address is required").isRequired("required"),
        // textarea: StringType().isRequired("A MESSAGE MUST BE ENTERED!")
        password: StringType().isRequired("required")
    })

    const formClick = async () => {
        if(!formRef.current.check()) {
            console.error('form error');
            return;
        }
        console.log('formValue on click', formValue)
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValue),
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    toaster.push(    
                    <Message showIcon type="error" header="Error">
                        Try Again
                  </Message>)
                }
            })
            .then((data) => {
                console.log('data', data)
                localStorage.setItem("jwt", data.token);
                dispatch(setUser(data.user))
                setFormValue(defaultFormValue)
                toaster.push(message)
                navigate(`/`)

                
            })
            .catch(error => alert(error.res.data))
    }



    return (
        <>
        <h1 style={{margin: 40}} >Login</h1>
            <Form
            style={{margin: 40}}
                ref={formRef}
                formValue={formValue}
                onChange={formValue => setFormValue(formValue)}
                onSubmit={formClick}
                model={model}
                fluid
            >
                <Form.Group controlId="email">
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" type="email" />
                    <Form.HelpText tooltip>Required</Form.HelpText>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control name="password" type="password" autoComplete="off" />
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="ghost" type='submit'>Submit</Button>
                        <Button onClick={() => setFormValue(defaultFormValue)} appearance="ghost">Cancel</Button>
                    </ButtonToolbar>
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <span>
                            Or,  <Button onClick={() => navigate('/newuser')} appearance="subtle" color="yellow">Create Account</Button>
                        </span>
                    </ButtonToolbar>
                </Form.Group>

            </Form>
            {/* <div>
                <h1>Name: {user.profile.name}</h1>
                <h1>Email: {user.profile.email}</h1> */}
                {/* <button
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(login({name: "anderson", email: "asilva@gmail.com"}))
                }}
                >Log In
            </button> */}
                {/* <button
                    onClick={() => {
                        localStorage.clear();
                        dispatch(logout())
                    }}
                >
                    Log Out
                </button>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    login form

                    <input
                        onChange={updateForm}
                        name="email"
                        type="text"
                        placeholder="email"
                    />
                    <input
                        onChange={updateForm}
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <input type="submit" />
                    <ButtonToolbar>
                        <Button appearance="ghost" type='submit'>Submit</Button>
                        <Button appearance="ghost">Cancel</Button>
                    </ButtonToolbar>

                </form> */}

                {/* <button onClick={handleClick}>Create New Account</button>

            </div> */}
        </>
    )
}
export default Login

