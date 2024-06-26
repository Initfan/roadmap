import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ProductDetail = () => {
    const params = useParams()

    return (
        <div>
            <h1>product detail</h1>
            <p>{params.id}</p>
            <p><Link to='..' relative='path'>Back</Link></p>
        </div>
    )
}

export default ProductDetail