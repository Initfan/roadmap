import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery()

    return (
        <div>
            {isLoading ?
                <Loader />
                : error ?
                    <Message variant='danger'>{error.data.message || error.error}</Message>
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