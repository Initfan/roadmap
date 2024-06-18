import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import {
    useCreateProductMutation,
    useUploadProductImageMutation
} from '../../slices/productApiSlice'
import { useSelector } from 'react-redux'

const ProductCreateScreen = () => {
    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.auth)

    const [product, setProduct] = useState({
        user: userInfo._id,
        name: '',
        price: '',
        image: null,
        brand: '',
        category: '',
        countInStock: '',
        description: '',
    })

    const [createProduct, { isLoading, error }] = useCreateProductMutation()
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation()

    const uploadImage = async (files) => {
        const formData = new FormData()
        formData.append('image', files)
        const uploadedImage = await uploadProductImage(formData).unwrap()
        return uploadedImage
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const uploadedImage = await uploadImage(product.image)
            console.log(uploadedImage)
            await createProduct({ ...product, image: uploadedImage.image })
            toast.success('Create product successfuly')
            navigate('/admin/productlist')
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
                <h1>Create Product</h1>
                {isLoading && <Loader />}

                {isLoading
                    ? <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='my-2'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    onChange={e => setProduct(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='price' className='my-2'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    onChange={e => setProduct(prev => ({ ...prev, price: e.target.value }))}
                                />
                            </Form.Group>

                            <Form.Group controlId='image' className='my-2'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='file'
                                    label='Choose file'
                                    onChange={(e) => setProduct(prev => ({ ...prev, image: e.target.files[0] }))}
                                ></Form.Control>
                            </Form.Group>
                            {loadingUpload && <Loader />}

                            <Form.Group controlId='brand' className='my-2'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter brand'
                                    onChange={e => setProduct(prev => ({ ...prev, brand: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='counInStock' className='my-2'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter count in stock'
                                    onChange={e => setProduct(prev => ({ ...prev, countInStock: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='category' className='my-2'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter category'
                                    onChange={e => setProduct(prev => ({ ...prev, category: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='description' className='my-2'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    onChange={e => setProduct(prev => ({ ...prev, description: e.target.value }))}
                                />
                            </Form.Group>
                            <Button
                                type='submit'
                                variant='primary'
                                className='my-2'
                            >Create</Button>
                        </Form>
                }
            </FormContainer>
        </div>
    )
}

export default ProductCreateScreen