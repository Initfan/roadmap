import React from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice'
import Loader from '../../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaCheck, FaEdit, FaTrashAlt } from 'react-icons/fa'
import Message from '../../components/Message'
import { toast } from 'react-toastify'

const UserListScreen = () => {
    const { data: users, isLoading: loadingUser, error, refetch } = useGetUsersQuery()

    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

    const deleteHandler = async (userId) => {
        if (window.confirm('Are you sure?'))
            try {
                await deleteUser(userId)
                refetch()
                toast.success('Delete user successfuly')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
    }

    return (
        <div>
            <Row>
                <Col>
                    <h1>Users</h1>
                </Col>
                <Col className='text-end'>
                </Col>
            </Row>

            {loadingDelete && <Loader />}

            {loadingUser
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user =>
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? <FaCheck color='green' /> : '❌'}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button className='btn-sm' variant='warning'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button className='btn-sm' variant='danger' onClick={() => deleteHandler(user._id)}>
                                            <FaTrashAlt style={{ color: 'white' }} />
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </Table>
            }
        </div>
    )
}

export default UserListScreen