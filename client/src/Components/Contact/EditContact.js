const EditContact = ({id, contact}) => {
    console.log('id', id)
    console.log('contact', contact)
    return(
        <div>
            <form>
                <input type="text" placeholder="Update Name"/>
            </form>
        </div>
    )
}

export default EditContact