import { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaginateProducts from "./PaginateProducts";

const ProductsPage = ({prodBlackList}) => {

    let navigate = useNavigate()

    const [ownersNames, setOwnersNames] = useState([])
    const [owner, setOwner] = useState([])

    const [products, setProducts] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const [sortField, setSortField] = useState('')
    const [order, setOrder] = useState('asc')




    const [page, setPage] = useState(1)

    const [pageCount, setPageCount] = useState();


    useEffect(() => {
        getProductsForPage(page, sortField, order)
    }, [page, sortField, order])



    const getProductsForPage = async (page) => {
        // console.log('page', page)
        // console.log('order', order)
        // console.log('sortField', sortField)
        const res = await fetch(`http://localhost:3000/products_paginated/${page}?${sortField}=${order}`)
        const productsPageData = await res.json()
        // console.log('productsPageData', productsPageData)

        const productsDataArray = productsPageData.products
        // console.log('productsDataArray', productsDataArray)
        const pagina = productsPageData.page
        // console.log('pagina', pagina)
        const paginaCuenta = productsPageData.page_count
        setPageCount(paginaCuenta)
        // console.log('paginaCuenta', paginaCuenta)

        let pObjKeys = Object.keys(productsDataArray[0])
        // console.log('pObjKeys', pObjKeys)

        let pDisplayKeys = pObjKeys.filter((item) => !prodBlackList.includes(item))

        productsDataArray.map(objectElement => {
            prodBlackList.map((element) => delete objectElement[element])
        })

        let pDisplayProducts = productsDataArray.filter((item) => !prodBlackList.includes(item))

        setKeyArray(pDisplayKeys)
        setProducts(pDisplayProducts)

        // console.log('pDisplayKeys', pDisplayKeys)
        // console.log('pDisplayProducts', pDisplayProducts)
    }


    // const fetchProducts = async () => {
    //     const response = await fetch(`http://localhost:3000/products`)
    //     const productsArray = await response.json()

    //     let objKeys = Object.keys(productsArray[0])

    //     let displayKeys = objKeys.filter((item) => !prodBlackList.includes(item))

    //     productsArray.map(objectElement => {
    //         prodBlackList.map((element) => delete objectElement[element])
    //     })

    //     let displayProducts = productsArray.filter((item) => !prodBlackList.includes(item))


    //     if (owner == "All") {
    //         setProducts(displayProducts)
    //     } else setProducts(displayProducts.filter(product => product.owner_name == owner))
    //     setProducts(displayProducts)

    //     setKeyArray(displayKeys)
    // }

    const newDisplayedProducts = products. filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase())
    })


    const fetchOwnersNames = async () => {
        const response = await fetch(`http://localhost:3000/users_names`)
        const ownersNamesArray = await response.json()
        setOwnersNames(ownersNamesArray)
    }

    useEffect(() => {
        // fetchProducts()
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
        // if (sortField) {
        //     const sorted = [...products].sort((a,b) => {
        //         return (
        //             a[sortField]?.toString().localeCompare(b[sortField]?.toString(), 'en', {
        //                 numeric: true,
        //             }) * (sortOrder === 'asc' ? 1 : -1)
        //         )
        //     })
        //     setProducts(sorted)
        // }
    }


    const handleSortingChange = (field) => {
        const sortOrder =
        field === sortField && order === 'asc' ? 'desc' : 'asc'

        console.log('field', field)
        console.log('sortOrder', sortOrder)
        // console.log('field, sortOrder', field, sortOrder)
        setSortField(field)
        setOrder(sortOrder)
        handleSorting(field, sortOrder)
    }

    const updateOwner = (e) => {
        setOwner(e.target.value)
    }

    const handleClick = (id) => {
        // console.log('clicked: ', id)
        navigate(`/products/${id}`)
        
    }
    // console.log('products', products)
    // console.log('keyArray', keyArray)

    return (
        <main className="main">
            <NavLink className='new-product-navlink' to='/products/new' >
                <button className='new-product'>Add Product</button></NavLink>
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
                    {products.map(product=>{
                        let productVals = Object.values(product)
                        // console.log('product?', product)
                        // console.log('productVals', productVals)
                        return (
                            <tr onClick={() => handleClick(product.id)}>
                                {productVals.map(val => {
                                    // console.log('val', val)
                                    return (
                                        <td>{val}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <PaginateProducts pageCount={pageCount} getProductsForPage={getProductsForPage} data={products}/>
        </main>
    )
}

export default ProductsPage;