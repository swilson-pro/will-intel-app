import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import ProductsPage from "../Product/ProductsPage"

import { useNavigate } from "react-router-dom"


const NewUser = () => {

    let navigate = useNavigate()

    const [form, setForm] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('form inside handlesubmit', form)
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('something wrong');
            }
        })
        .then (result => {
            console.log('result', result)
            alert('Account Created')
            navigate(`/login`)
        })
        .catch(error => alert(error.response.data))


    }

    const updateForm = (e) => {
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    console.log('form', form)
    return (
        <div>
            <h1>new user form</h1>
            <form
                onSubmit={handleSubmit}
            >
                <input 
                    onChange={updateForm}
                    name="name"
                    type="text"
                    placeholder="name"
                />
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
                <input type="submit"/>
            </form>
        </div>
    )
}

export default NewUser