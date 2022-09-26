const EditContact = ({id, contact, fetchContact}) => {
    console.log('id', id)
    console.log('contact', contact)

    const updateName = async (e) => {
        e.preventDefault()
        console.log('e.target', e.target)
        console.log('e.target[0]', e.target[0])
        console.log('e.target[0].value', e.target[0].value)
        let newName = e.target[0].value
        let req = await fetch(`http://localhost:3000/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: newName
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        fetchContact()
    }
    return(
        <div>
            <form onSubmit={updateName}>
                <input type="text" placeholder="Update Name"/>
                <input type="submit" value="Update Name" />
            </form>
        </div>
    )
}

export default EditContact