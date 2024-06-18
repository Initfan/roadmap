import React, { useEffect, useState } from 'react'

import { useGetUserDetailQuery, useUpdateUserMutation } from '../../slices/usersApiSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

const UserEditScreen = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        isAdmin: false
    })

    const { id: userId } = useParams()
    const navigate = useNavigate()

    const { data, isLoading, error } = useGetUserDetailQuery(userId)

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            await updateUser({ userId, ...user })
            toast.success('Update user successfuly')
            navigate('/admin/userlist')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    useEffect(() => {
        if (data) {
            setUser({
                name: data.name,
                email: data.email,
                isAdmin: data.isAdmin
            })
        }
    }, [data])

    return (
        <div>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>

                {loadingUpdate && <Loader />}

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
                                    value={user.name}
                                    onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='email' className='my-2'>
                                <Form.Label>email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={user.email}
                                    onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </Form.Group>
                            <Form.Group controlId='email' className='my-2'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    value={user.isAdmin}
                                    onChange={e => setUser(prev => ({ ...prev, isAdmin: e.target.value }))}
                                    checked={user.isAdmin}
                                ></Form.Check>
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

export default UserEditScreen