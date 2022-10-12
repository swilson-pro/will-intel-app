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

    let names = data.names
    console.log('names', names)

    let result

    names ? result = names.filter((x, i, a) => a.indexOf(x) == i) : console.log('names dont exist')

    // const result = names.filter((x, i, a) => a.indexOf(x) == i);
    console.log('result', result)

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
            <ContactDupes data={data} names={result}/>
            
        </>
    );
};

export default Dupes