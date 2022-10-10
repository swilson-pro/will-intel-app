import { Slider } from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';
import Nav from "@rsuite/responsive-nav";
import { useEffect, useState } from 'react';
import { InputPicker } from 'rsuite'
import ContactDupes from './ContactDupes';


const categories = ['Contacts', 'Companies', 'Products'].map(
    item => ({ label: item, value: item })
);



const Dupes = () => {

    const [data, setData] = useState([])
    const [type, setType] = useState(null)

    const featCategory = category => {
        setType(category)
        fetch(`http://localhost:3000/dupes/${category.toLowerCase()}`)
        .then(resp=> resp.json())
        .then(data=> {
            setData(data)
        })
    }

    const fetchContactDupes = async () => {
        fetch(`http://localhost:3000/dupes/contacts`)
            .then(resp => resp.json())
            .then(data => {
                setData(data)
            })
    }

    useEffect(() => {
        fetchContactDupes()
    }, [])
    // console.log('data', data)
    // console.log('type', type)

    return (
        <>
        <label>Choose Category</label>
            <InputPicker
                data={categories}
                block
                placeholder="Contacts"
                onSelect={featCategory}
            />
            <ContactDupes data={data}/>
            
        </>
    );
};

export default Dupes