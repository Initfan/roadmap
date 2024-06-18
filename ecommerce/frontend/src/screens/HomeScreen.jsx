import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
    const { pageNumber, keyword } = useParams()
    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber })

    return (
        <div>
            {!keyword
                ? <ProductCarousel />
                : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>
            }

            {isLoading ?
                <Loader />
                : error ?
                    <Message variant='danger'>{error?.data?.message || error.error}</Message>
                    :
                    <div>
                        <h1>Latest Products</h1>
                        <Row>
                            {data.products.map(product =>
                                <Col sm={12} md={6} lg={4} xl={3}>
                                    <Product key={product.id} product={product} />
                                </Col>
                            )}
                        </Row>
                        <Paginate
                            pages={data.pages}
                            page={data.page}
                            keyword={keyword || ''}
                        />
                    </div>
            }
        </div>
    )
}

export default HomeScreen