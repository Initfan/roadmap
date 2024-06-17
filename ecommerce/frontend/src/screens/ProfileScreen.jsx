import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useProfileMutation } from '../slices/usersApiSlice'
import { useGetMyOrdersQuery } from '../slices/orderApiSlice'
import { setCredentials } from '../slices/authSlice'
import { FaTimes } from 'react-icons/fa'

const ProfileScreen = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

    const { data: orders, isLoading, error } = useGetMyOrdersQuery()

    useEffect(() => {
        if (userInfo) {
            setProfile({
                name: userInfo.name,
                email: userInfo.email
            })
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault()

        if (profile.password !== profile.confirmPassword)
            return toast.error('Password do not match')

        try {
            const res = await updateProfile({ _id: userInfo._id, ...profile }).unwrap()
            dispatch(setCredentials(res))
            toast.success('Profile update successfuly')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={profile.name}
                            onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={profile.email}
                            onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group controlId='password' className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={profile.password}
                            onChange={e => setProfile(prev => ({ ...prev, password: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className='my-2'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter confirm password'
                            value={profile.confirmPassword}
                            onChange={e => setProfile(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-2'>
                        Update
                    </Button>

                    {loadingUpdateProfile && <Loader />}
                </Form>
            </Col>
            <Col md={9}>
                {isLoading
                    ? <Loader />
                    : error
                        ? <Message variant='danger'>
                            {error.data.message || error.error}
                        </Message>
                        : <Table
                            className='table-sm'
                            striped
                            hover
                            responsive
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order =>
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            {order.isPaid
                                                ? order.paidAt.substring(0, 10)
                                                : <FaTimes style={{ color: 'red' }} />
                                            }
                                        </td>
                                        <td>
                                            {order.isDelivered
                                                ? order.deliverAt.substring(0, 10)
                                                : <FaTimes style={{ color: 'red' }} />
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm' variant='light'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                }
            </Col>
        </Row>
    )
}

export default ProfileScreen