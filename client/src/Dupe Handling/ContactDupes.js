import { List, FlexboxGrid } from 'rsuite';
import ImageIcon from '@rsuite/icons/legacy/Image';
import FilmIcon from '@rsuite/icons/legacy/Film';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { useCallback, cloneElement, useEffect } from 'react';
import { useState } from 'react'
import Moment from 'moment';


const ContactDupes = ({ data, names }) => {
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
            <ul>
                {names.map((name, index) => {
                    return <li key={index}>{name}
                    <ul>
                        {data.data.map((d) => {
                            return d[1] === name ? <li>{`${d[1]} | id: ${d[0]} | Created: ${Moment(d[2]).format('MMM DD, LT')}`}</li> : null
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