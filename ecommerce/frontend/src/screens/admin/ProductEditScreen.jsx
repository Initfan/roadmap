import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import {
    useGetProductDetailQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation
} from '../../slices/productApiSlice'

const ProductEditScreen = () => {
    const { id: productId } = useParams()

    const navigate = useNavigate()

    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        brand: '',
        category: '',
        countInStock: '',
        description: '',
    })

    const { data, isLoading, error } = useGetProductDetailQuery(productId)

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation()

    useEffect(() => {
        if (data) {
            setProduct({
                name: data.name,
                price: data.price,
                image: data.image,
                brand: data.brand,
                category: data.category,
                countInStock: data.countInStock,
                description: data.description,
            })
        }
    }, [data])

    const submitHandler = async (e) => {
        e.preventDefault()
        const updatedProduct = { ...product, productId };

        const result = await updateProduct(updatedProduct)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success('Product updated')
            navigate('/admin/productlist')
        }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        console.log(e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setProduct(prev => ({ ...prev, image: res.image }))
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}

                {isLoading
                    ? <Loader />
                    : error
                        ? <Message variant='danger'>{{ error?.data?.message || error.error}}</Message>
                        : <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='my-2'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={product.name}
                                    onChange={e => setProduct(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='price' className='my-2'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={product.price}
                                    onChange={e => setProduct(prev => ({ ...prev, price: e.target.value }))}
                                />
                            </Form.Group>

                            <Form.Group controlId='image' className='my-2'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image url'
                                    value={product.image}
                                    onChange={e => setProduct(prev => ({ ...prev, image: e.target.value }))}
                                />
                                <Form.Control
                                    type='file'
                                    label='Choose file'
                                    onChange={uploadFileHandler}
                                ></Form.Control>
                            </Form.Group>
                            {loadingUpload && <Loader />}

                            <Form.Group controlId='brand' className='my-2'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    value={product.brand}
                                    onChange={e => setProduct(prev => ({ ...prev, brand: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='counInStock' className='my-2'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter count in stock'
                                    value={product.countInStock}
                                    onChange={e => setProduct(prev => ({ ...prev, countInStock: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='category' className='my-2'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter category'
                                    value={product.category}
                                    onChange={e => setProduct(prev => ({ ...prev, category: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='description' className='my-2'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={product.description}
                                    onChange={e => setProduct(prev => ({ ...prev, description: e.target.value }))}
                                />
                            </Form.Group>
                            <Button
                                type='submit'
                                variant='primary'
                                className='my-2'
                            >Update</Button>
                        </Form>
                }
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen