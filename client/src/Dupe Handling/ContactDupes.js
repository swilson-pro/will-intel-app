import { List, FlexboxGrid } from 'rsuite';
import ImageIcon from '@rsuite/icons/legacy/Image';
import FilmIcon from '@rsuite/icons/legacy/Film';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { useCallback, cloneElement, useEffect } from 'react';
import { useState } from 'react'
import Moment from 'moment';

import { Panel, Placeholder, Stack, ButtonGroup, Button } from 'rsuite';


const ContactDupes = ({ data, names, owners }) => {
    console.log('names', names)
    // console.log('data.data', data.data)

    const contacts = data.data

    // let names = data.names


    // console.log('data.names', data.names)


    // console.log('names', names)

    // const result = names.filter((x, i, a) => a.indexOf(x) == i);

    // console.log('result', result);
    // expected output: Array ["exuberant", "destruction", "present"]



    // console.log('contacts[0]', contacts[0])

    return (
        <>
            <h1>hello world</h1>
            {/* {data.data ? console.log('data.data', data.data) : console.log('no data.data')} */}
            {names && data.data ?
                <div>
                    {names.map((name, index) => {
                        return <ul key={index}>{`${name} (${data.data.filter(d => d[1] === name).length})`}
                            <div>
                                {data.data.map((d) => {
                                    return d[1] === name ? <div className='dupe_name'>
                                        {`${d[1]}`}
                                        <button className='dupe_button'>primary</button>
                                        <div>
                                            <p>{`ID: ${d[0]}`}</p>
                                            <p>{`Created: ${Moment(d[2]).format('MMM DD, LT')}`}</p>
                                            <p>{`Image: ${d[3]}`}</p>
                                            {/* <li>{`Owner: ${owners.map((owner) => {
                                    return owner[0] === d[4] ? owner[1] : null
                                })}`}</li> */}
                                            <p>{`Owner: ${owners.find((owner) => owner[0] === d[4])[1]}`}</p>
                                            {/* <li>{`Owner: ${owners.filter((owner) => owner[0] === d[4])}`}</li> */}
                                        </div>
                                    </div> : null
                                })}
                            </div>
                        </ul>
                    })}

                </div>
                : "names don't exist"}
            {names && data.data ?
                <ul>
                    {names.map((name, index) => {
                        return <li key={index}>{name}
                            <ul>
                                {data.data.map((d) => {
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