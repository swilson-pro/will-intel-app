import { List, FlexboxGrid } from 'rsuite';
import ImageIcon from '@rsuite/icons/legacy/Image';
import FilmIcon from '@rsuite/icons/legacy/Film';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { useCallback, cloneElement, useEffect } from 'react';
import { useState } from 'react'
import Moment from 'moment';

import { Panel, Placeholder, Stack, ButtonGroup, Button } from 'rsuite';


const ContactDupes = ({ data, names, owners, fetchContactDupes }) => {
    console.log('names', names)
    console.log('data', data)
    console.log('owners', owners)

    const contacts = data
    const [preview, setPreview] = useState('')
    const [primary, setPrimary] = useState('')
    const [secondary, setSecondary] = useState('')



    // console.log('names', names)

    // const result = names.filter((x, i, a) => a.indexOf(x) == i);

    // console.log('result', result);
    // expected output: Array ["exuberant", "destruction", "present"]

    // console.log('contacts[0]', contacts[0])

    const handlePreviewSubmit = async (e) => {
        e.preventDefault()
        console.log('e', e)
        console.log('e.target', e.target)
        console.log('e.target.value', e.target.value)
        console.log('e.target[0]', e.target[0])
        console.log('e.target[1]', e.target[1])
        console.log('e.target[0].name', e.target[0].name)
        console.log('e.target[1].name', e.target[1].name)
    }

    const handleClick = async (e) => {
        e.preventDefault()
        fetchContactDupes()
        console.log('e.target', e.target)
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
        console.log('e.target[0]', e.target[0])
        console.log('e.target[1]', e.target[1])
        console.log('hi')
    }

    console.log('data', data)
    console.log('names', names)

    const unPrimaryOthers = async (sameName) => {
        console.log('sameName', sameName)
        console.log('begin')
        for(let item of sameName) {
            await unPrimary(item)
        }
        console.log('finished');
        return;
    }

    const unPrimary = async (item) => {
        console.log('item to unprmary',item)
        let req = await fetch(`http://localhost:3000/contacts/${item.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                is_dupe_primary: "false"
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
    }

    const handleRadioClick = async (e) => {
        console.log('e', e)
        console.log('e.target', e.target)
        console.log('e.target.value', e.target.value)
        console.log('typeof(e.target.value)', typeof (e.target.value))
        console.log('now make this one primary, and dupes w same name not primary')
        console.log('data after click', data)
        const chickens = data.map(item => item.id)
        console.log('chickens', chickens)
        const result = data.filter(item => item.id === parseInt(e.target.value))
        console.log('result', result)
        const nombre = result[0].name
        console.log('nombre', nombre)
        const sameName = data.filter(item => item.name === nombre && item.id !== parseInt(e.target.value))
        // console.log('sameName', sameName)

        unPrimaryOthers(sameName)




        // set others' primary value to false




        let req = await fetch(`http://localhost:3000/contacts/${e.target.value}`, {
            method: "PATCH",
            body: JSON.stringify({
                is_dupe_primary: true
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
    }
    return (
        <>
            {/* {data.data ? console.log('data.data', data.data) : console.log('no data.data')} */}
            {names && data ?
                <div>
                    <h1>{`Total Dupes: ${names.length}`}</h1>
                    {names.map((name, index) => {
                        return <form>
                            <ul key={index}>{`${name} (${data.filter(d => d.name === name).length})`}
                                <div>
                                    {data.map((d) => {
                                        return d.name === name ? <div className='dupe_name'>
                                            {`${name}`}
                                            <div className='dupe_button'>
                                                {/* <input type="radio" id={d.id} name='primary_button' value={`id: ${d.id}, name: ${d.name}`} onChange={(e) => setPrimary(e.target.value)}></input> */}
                                                <input type="radio" id={d.id} name={name} value={`${d.id}`} onChange={(e) => handleRadioClick(e)}></input>
                                                <label htmlFor={d.id}>Primary</label>
                                            </div>
                                            <div>
                                                <p>{`ID: ${d.id}`}</p>
                                                <p>{`Created: ${Moment(d[2]).format('MMM DD, LT')}`}</p>
                                                <p>{`Image: ${d.image_url}`}</p>
                                                {/* <li>{`Owner: ${owners.map((owner) => {
                                    return owner[0] === d[4] ? owner[1] : null
                                })}`}</li> */}
                                                <p>{`Owner: ${owners.find((owner) => owner[0] === d.user_id)[1]}`}</p>
                                                {/* <li>{`Owner: ${owners.filter((owner) => owner[0] === d[4])}`}</li> */}
                                                <p>{`Phone: ${d.phone}`}</p>
                                                <p>{`Notes: ${d.notes_count}`}</p>
                                            </div>
                                        </div> : null
                                    })}
                                    <button name={name} type="submit" onClick={(e, name) => handleClick(e, name)}>Preview</button>

                                </div>


                            </ul>
                        </form>
                    })}

                </div>
                : "names don't exist"}
            {names && data ?
                <ul>
                    {names.map((name, index) => {
                        return <li key={index}>{name}
                            <ul>
                                {data.map((d) => {
                                    return d[1] === name ? <li className='dupe_name'>
                                        {`${d[1]}`}
                                        <button className='dupe_button'>primary</button>
                                        <ul>
                                            <li>{`ID: ${d[0]}`}</li>
                                            <li>{`Created: ${Moment(d[2]).format('MMM DD, LT')}`}</li>
                                            <li>{`Image: ${d[3]}`}</li>
                                            {/* <li>{`Owner: ${owners.map((owner) => {
                                    return owner[0] === d[4] ? owner[1] : null
                                })}`}</li> */}
                                            <li>{`Owner: ${owners.find((owner) => owner[0] === d[4])[1]}`}</li>
                                            {/* <li>{`Owner: ${owners.filter((owner) => owner[0] === d[4])}`}</li> */}
                                        </ul>
                                    </li> : null
                                })}
                            </ul>
                        </li>
                    })}

                </ul>
                : "names don't exist"}
            {/* <List>
        {result.map((name, index) => {
            return (
                <List.Item key={index}>{name}</List.Item>
            )
        })}
    </List> */}
        </>
    );
};

export default ContactDupes