import { useEffect, useState } from "react";

const ProductsPage = ({prodBlackList}) => {

    const [ownersNames, setOwnersNames] = useState([])
    const [owner, setOwner] = useState([])

    const [products, setProducts] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const [sortField, setSortField] = useState('')
    const [order, setOrder] = useState('asc')

    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:3000/products`)
        const productsArray = await response.json()

        let objKeys = Object.keys(productsArray[0])

        let displayKeys = objKeys.filter((item) => !prodBlackList.includes(item))

        productsArray.map(objectElement => {
            prodBlackList.map((element) => delete objectElement[element])
        })

        let displayProducts = productsArray.filter((item) => !prodBlackList.includes(item))


        if (owner == "All") {
            setProducts(displayProducts)
        } else setProducts(displayProducts.filter(product => product.owner_name == owner))
        setProducts(displayProducts)

        setKeyArray(displayKeys)
    }

    const newDisplayedProducts = products. filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase())
    })


    const fetchOwnersNames = async () => {
        const response = await fetch(`http://localhost:3000/users_names`)
        const ownersNamesArray = await response.json()
        setOwnersNames(ownersNamesArray)
    }

    useEffect(() => {
        fetchProducts()
        fetchOwnersNames()
    }, [owner])

    let formatter = (str) => {
        let arr = str.split('')
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '_') {
                arr[i] = " "
            }
        }
            for (let i = 0; i < arr.length; i++) {
                if (i == 0 || arr[i - 1] == " ") {
                    arr[i] = arr[i].toUpperCase()
                }
            }
            let result = ""
            for (let i = 0; i < arr.length; i++) {
                result = result + arr[i]
            }
            return result
        }
    

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...products].sort((a,b) => {
                return (
                    a[sortField]?.toString().localeCompare(b[sortField]?.toString(), 'en', {
                        numeric: true,
                    }) * (sortOrder === 'asc' ? 1 : -1)
                )
            })
            setProducts(sorted)
        }
    }


    const handleSortingChange = (field) => {
        const sortOrder =
        field === sortField && order === 'asc' ? 'desc' : 'asc'

        console.log('field', field)
        console.log('sortOrder', sortOrder)
        console.log('field, sortOrder', field, sortOrder)
        setSortField(field)
        setOrder(sortOrder)
        handleSorting(field, sortOrder)
    }

    const updateOwner = (e) => {
        setOwner(e.target.value)
    }


    console.log('products', products)
    console.log('keyArray', keyArray)

    return (
        <main className="main">
            <div className="filter">
                <label className='filterLabel'>Choose owner:</label>
                <select name='ownersNames' id='ownersNames' onChange={updateOwner}>
                    <option value="All">All</option>
                    {ownersNames.map((ownerName) => {
                        return <option value={ownerName}>{ownerName}</option>
                    })}
                </select>
                <div className='searchbox'>
                <input
                type='text'
                id='search'
                placeholder='search by name'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>
            <table className="products-table">
                <thead>
                    <tr>
                        {keyArray.map((key) => {
                            return(
                                <th onClick={() => handleSortingChange(key)}>{formatter(key)}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {newDisplayedProducts.map(product=>{
                        let productVals = Object.values(product)

                        return (
                            <tr>
                                {productVals.map(val => {
                                    return (
                                        <td>{val}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}

export default ProductsPage;