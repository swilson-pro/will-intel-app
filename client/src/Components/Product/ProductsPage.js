import { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaginateProducts from "./PaginateProducts";

import { Button, IconButton, Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'

const {Column, HeaderCell, Cell} = Table

const ProductsPage = ({prodBlackList}) => {

    let navigate = useNavigate()

    const [productCount, setProductCount] = useState()

    const [loading, setLoading] = useState(true)

    const [ownersNames, setOwnersNames] = useState([])
    const [owner, setOwner] = useState([])

    const [products, setProducts] = useState([])
    const [keyArray, setKeyArray] = useState([])

    const [searchTerm, setSearchTerm] = useState("")

    const [sortField, setSortField] = useState('description')
    const [order, setOrder] = useState('asc')




    const [page, setPage] = useState(1)

    const [pageCount, setPageCount] = useState();

    // console.log('pageCount', pageCount)


    useEffect(() => {
        getProductsForPage(page, sortField, order)
        getProductsCount()
    }, [page, sortField, order])


    const getProductsCount = async () => {
        const res = await fetch(`http://localhost:3000/api/count_products`)
        const count = await res.json()
        setProductCount(count)
    }

    const getProductsForPage = async (page) => {
        // console.log('page', page)
        // console.log('order', order)
        // console.log('sortField', sortField)
        const res = await fetch(`http://localhost:3000/api/products_paginated/${page}?${sortField}=${order}`)
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
        setLoading(false)

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
        const response = await fetch(`http://localhost:3000/api/users_names`)
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


    const handleSortingChange = (sortColumn) => {
        const sortOrder =
        sortColumn === sortField && order === 'asc' ? 'desc' : 'asc'


        // console.log('sortOrder', sortOrder)

        setSortField(sortColumn)
        setOrder(sortOrder)
        handleSorting(sortColumn, sortOrder)
    }

    const updateOwner = (e) => {
        setOwner(e.target.value)
    }

    const handleClick = (rowData) => {
        // console.log('clicked: ', id)
        navigate(`/products/${rowData.id}`)
        
    }
    // console.log('products', products)
    // console.log('keyArray', keyArray)

    return (
        <main className="main">
            <p className='user-stats'>Products: {productCount}</p>
            <Table
            loading={loading}
            className="table"
            showHeader={true}
            height={1000}
            data={products}
            onRowClick={rowData => {
                handleClick(rowData)
            }}
            onSortColumn={handleSortingChange}
            bordered={true}
            cellBordered={true}
            fluid
            >
            {keyArray.map((key, index) => {
                return (
                    <Column className="table-column" width={150} align="left" resizable sortable>
                        <HeaderCell className="table_header" key={index}>{formatter(key)}</HeaderCell>
                        <Cell className="table-cell" dataKey={key} />
                    </Column>
                )
            })}                

            </Table>
            {/* <table className="products-table">
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
            </table> */}
            <PaginateProducts pageCount={pageCount} getProductsForPage={getProductsForPage} data={products}/>
        </main>
    )
}

export default ProductsPage;