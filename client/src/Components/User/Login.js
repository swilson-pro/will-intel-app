import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'

import { useNavigate } from "react-router-dom"

import {setUser, logout} from '../../features/user/user'

const Login = () => {

    const user = useSelector((state) => state.user);

    let navigate = useNavigate()

    const dispatch = useDispatch()
    const [form, setForm] = useState({})

    let handleSubmit = (e) => {
        e.preventDefault()
        console.log('form', form)
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("jwt", data.token);
            dispatch(setUser(data.user))
          });
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
        if (token && !user.isLoggedin) {
            fetch("http://localhost:3000/profile", {
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log('dispatch from useEffect engaged')
                dispatch(setUser(data))
            });
        }
    }, [])

    console.log('form', form)
    console.log('user', user)

    const handleClick = () => {
        navigate(`/newuser`)
    }
    

    return (
        <div>
            <h1>Name: {user.profile.name}</h1>
            <h1>Email: {user.profile.email}</h1>
            {/* <button
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(login({name: "anderson", email: "asilva@gmail.com"}))
                }}
                >Log In
            </button> */}
            <button
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
                
            </form>
            <button onClick={handleClick}>Create New Account</button>
        </div>
    )
}
export default Login

