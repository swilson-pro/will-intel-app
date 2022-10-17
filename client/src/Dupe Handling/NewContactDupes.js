import { List, FlexboxGrid } from 'rsuite';
import ImageIcon from '@rsuite/icons/legacy/Image';
import FilmIcon from '@rsuite/icons/legacy/Film';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { useCallback, cloneElement, useEffect } from 'react';
import { useState } from 'react'
import Moment from 'moment';

import { Panel, Placeholder, Stack, ButtonGroup, Button } from 'rsuite';

import ContactMergeDrawer from './ContactMergeDrawer';


const NewContactDupes = ({ data, names, owners, fetchContactDupes }) => {

    console.log('data', data)
    console.log('names', names)

    const [nombre, setNombre] = useState(null)

    let dupe = data.filter(item => item.name === nombre)



    const [primary, setPrimary] = useState('')

    const handleClick = (name) => {
        console.log('name', name)
        setNombre(name)
    }

    return (
        <>
            {/* {data.data ? console.log('data.data', data.data) : console.log('no data.data')} */}
            {names && data ?
            
                <div>
                    {nombre ? <ContactMergeDrawer nombre={nombre} setNombre={setNombre} data={data} owners={owners} /> : null}
                    <h1>{`Total Dupes: ${names.length}`}</h1>
                    {names.map((name, index) => {
                        return <ul key={index}>
                            {`${name}`}
                            <button onClick={() => handleClick(name)}>Fix</button>
                                <div>
                                    {data.map((d) => {
                                        return d.name === name ? <div className='dupe_name'>
                                            {`${name}`}
                                            <div className='dupe_button'>
                                            </div>
                                            <div>
                                                <p>{`ID: ${d.id}`}</p>
                                                <p>{`Created: ${Moment(d[2]).format('MMM DD, LT')}`}</p>
                                                <p>{`Image: ${d.image_url}`}</p>
                                                <p>{`Owner: ${owners.find((owner) => owner[0] === d.user_id)[1]}`}</p>
                                                <p>{`Phone: ${d.phone}`}</p>
                                                <p>{`Notes: ${d.notes_count}`}</p>
                                                <p>{`Email: ${!d.email ? "" : d.email}`}</p>
                                            </div>
                                        </div> : null
                                    })}

                                </div>


                            </ul>
                    })}

                </div>
                : "names don't exist"}

        </>
    );
};

export default NewContactDupes