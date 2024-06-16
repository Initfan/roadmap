import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Product from '../components/Product'

const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery()

    return (
        <div>
            {isLoading ?
                <h3>Loading...</h3>
                : error ?
                    <div>{error?.data?.message || error.error}</div>
                    :
                    <div>
                        <h1>Latest Products</h1>
                        <Row>
                            {products.map(product =>
                                <Col sm={12} md={6} lg={4} xl={3}>
                                    <Product key={product.id} product={product} />
                                </Col>
                            )}
                        </Row>
                    </div>
            }
        </div>
    )
}

export default HomeScreen