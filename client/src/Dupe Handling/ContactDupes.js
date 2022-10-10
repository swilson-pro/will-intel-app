import { List, FlexboxGrid } from 'rsuite';
import ImageIcon from '@rsuite/icons/legacy/Image';
import FilmIcon from '@rsuite/icons/legacy/Film';
import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { useCallback, cloneElement, useEffect } from 'react';
import { useState } from 'react'


const ContactDupes = ({ data }) => {
    console.log('data', data)

    const [names, setNames] = useState(data.names)


    console.log('names', names)

    const result = names.filter((x, i, a) => a.indexOf(x) == i);
    
    console.log('result', result);
    // expected output: Array ["exuberant", "destruction", "present"]
    

    return (
        <>
            <h1>hello world</h1>
            <List>
        {result.map((name, index) => {
            return (
                <List.Item key={index}>{name}</List.Item>
            )
        })}
    </List>
        </>
    );
};

export default ContactDupes