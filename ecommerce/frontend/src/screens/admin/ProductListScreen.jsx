import { LinkContainer } from 'react-router-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
    useGetProductsQuery,
    useDeleteProductMutation
} from '../../slices/productApiSlice'
import Paginate from '../../components/Paginate'

const ProductListScreen = () => {
    const { pageNumber } = useParams()

    const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber })

    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteProduct(id)
                refetch()
                toast.success('Product deleted')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Link className='btn-sm m-3' to='create'>Create Product</Link>
                </Col>
            </Row>

            {loadingDelete && <Loader />}

            {isLoading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : <div>
                        <Table
                            striped
                            bordered
                            hover
                            responsive
                            className='table-sm'
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
                                {data.products.map(product =>
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button className='btn-sm' variant='light'>
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button className='btn-sm' variant='danger' onClick={() => deleteHandler(product._id)}>
                                                <FaTrashAlt style={{ color: 'white' }} />
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>

                        <Paginate pages={data.pages} page={data.page} isAdmin={true} />
                    </div>
            }
        </div>
    )
}

export default ProductListScreen