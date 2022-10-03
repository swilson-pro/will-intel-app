import { useState, useEffect } from "react";

const Login = () => {

    const [user, setUser] = useState({name: ""});
    const [form, setForm] = useState({});

    console.log('localStorage.getItem("jwt")', localStorage.getItem("jwt"))


    let handleSubmit = (e) => {
        e.preventDefault();
        console.log('form', form);
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('data', data)
            localStorage.setItem("jwt", data.token);
            setUser({
              name: data.user.email,
              id: data.user.id
            });

          });
      };

    let updateForm = (e) => {
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    useEffect(() => {
        let token = localStorage.getItem("jwt");
        if (token && !user.name) {
          fetch("http://localhost:3000/profile", {
            headers: {
              token: token,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setUser({
                name: data.email,
              });
            });
        }
      }, []);

    //   console.log('form', form)
      console.log('user', user)


    return (
        <div>
            <h1>{!user.name ? "Guest" : user.name}</h1>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "red"
                }} 
            >
            <h1>Login</h1>
            <button
                onClick={() => {
                    localStorage.clear();
                    setUser({
                    name: "",
                    });
                }}
                >
                LOG OUT
            </button>
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
        </div>
    )
}

export default Login

