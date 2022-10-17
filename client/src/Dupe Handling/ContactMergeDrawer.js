import { useState } from "react"
import Dupes from "./Dupes"
import Moment from 'moment';

const ContactMergeDrawer = ({ nombre, setNombre, data, owners }) => {

    let dupesObject = data.filter(item => item.name === nombre)

    const [notesCount, setNotesCount] = useState(0)

    const noteCounting = (obj) => {
        let sum = 0;
        for (let i = 0; i < obj.length; i++) {
            sum += obj[i].notes_count
        }
        console.log('sum', sum)
        setNotesCount(sum)
    }
    
    const [primary, setPrimary] = useState('')
    const [primaryObj, setPrimaryObj] = useState({})
    const [secondaryObj, setSecondaryObj] = useState('')
    

    console.log('dupesObject', dupesObject)

    console.log('nombre', nombre)

    const handleClose = () => {
        console.log('clicked close this nombre', nombre)
        setNombre(null)
    }

    const handleMerge = async (e) => {
        e.preventDefault()
        console.log('we merged bruh')
    }

    const handleRadioClick = (e) => {
        console.log('e.target.value', e.target.value)
        setPrimary(e.target.value)
        const fuc = dupesObject.map(item => item)
        console.log('fuc', fuc)
        const primObject = dupesObject.filter(item => item.id === parseInt(e.target.value))
        const secObject = dupesObject.filter(item => item.id !== parseInt(e.target.value))
        console.log('primObject', primObject)
        console.log('secObject', secObject)
        setPrimaryObj(primObject)
        setSecondaryObj(secObject)
        noteCounting(dupesObject)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    console.log('primary', primary)
    console.log('primaryObj', primaryObj)
    console.log('notesCount', notesCount)

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>name: {nombre}</h1>
                <ul>phone:
                    {dupesObject.map((item) => {
                        { return item.phone ? <li>{item.phone}</li> : null }
                    })}
                </ul>
                <p>id: {primary}</p>
                <p>image: {primaryObj[0] ? primaryObj[0].image_url : null}</p>
                <p>Notes: {notesCount}</p>
                <ul>Email: 
                    <li>{primaryObj[0] ? primaryObj[0].email : secondaryObj[0] ? secondaryObj[0].email : null}</li>
                </ul>

                <ul>email:
                    {dupesObject.map((item) => {
                        {return item.email ? <li>{item.email}</li> : null}
                    })}
                </ul>
                {
                    dupesObject.map((d) => {
                        return <div>
                            <p>{`ID: ${d.id}`}</p>
                            <p>{`Created: ${Moment(d[2]).format('MMM DD, LT')}`}</p>
                            <p>{`Image: ${d.image_url}`}</p>
                            <p>{`Owner: ${owners.find((owner) => owner[0] === d.user_id)[1]}`}</p>
                            <p>{`Phone: ${d.phone}`}</p>
                            <p>{`Notes: ${d.notes_count}`}</p>
                            <input type="radio" id={d.id} name={nombre} value={d.id} onChange={(e) => handleRadioClick(e)}></input>
                            <label htmlFor={d.id}>Primary</label>
                        </div>
                    })
                }
                <button type='submit'>Merge</button>
                <button onClick={handleClose}>Close</button>
            </form>

        </>
    )

}

export default ContactMergeDrawer