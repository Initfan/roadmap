import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippinAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    const [shipping, setShipping] = useState({
        address: shippingAddress?.address || '',
        city: shippingAddress?.city || '',
        postalCode: shippingAddress?.postalCode || '',
        country: shippingAddress?.country || ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = e => {
        e.preventDefault()
        dispatch(saveShippinAddress(shipping))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />

            <h1>Shipping</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={shipping.address}
                        onChange={(e) => setShipping(prev => ({ ...prev, address: e.target.value }))}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={shipping.city}
                        onChange={(e) => setShipping(prev => ({ ...prev, city: e.target.value }))}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={shipping.postalCode}
                        onChange={(e) => setShipping(prev => ({ ...prev, postalCode: e.target.value }))}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={shipping.country}
                        onChange={(e) => setShipping(prev => ({ ...prev, country: e.target.value }))}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen