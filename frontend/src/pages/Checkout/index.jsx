import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from 'components/Message'
import { createOrder, clearOrderDetail } from 'app/orderSlice'
import { clearCart } from 'app/cartSlice'

import "./Checkout.scss"


function Checkout({ history }) {
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('COD')


    const { order, error } = useSelector(state => state.orderDetail)

    const dispatch = useDispatch()


    const cart = useSelector(state => state.cart)

    let numItems = cart.reduce((acc, item) => acc + item.qty, 0)
    let itemsPrice = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0).toFixed(2)
    let shippingCost = ((numItems > 10 || itemsPrice > 1000) ? 0 : 10 * numItems).toFixed(2)
    let totalCost = (Number(itemsPrice) + Number(shippingCost)).toFixed(2)


    useEffect(() => {
        // Check order == {}
        if (Object.keys(order).length !== 0) {
            history.push(`/order/${order.id}`)
            dispatch(clearCart())
            dispatch(clearOrderDetail())
        }
    }, [order, history, dispatch])

    const orderHandler = () => {
        dispatch(createOrder({
            orderLines: cart,
            shippingInfo: { phone, address, city, country },
            paymentMethod: paymentMethod,
            shippingCost: shippingCost,
            totalCost: totalCost,
        }))
    }

    return (
        <div>
            <h1>Checkout</h1>
            <Row>
                <Col md={8}>
                    <Form>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping Info</h2>
                                <Row>
                                    <Form.Group as={Col} controlId='address'>
                                        <Form.Label>Fullname</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Enter fullname'
                                            value={fullname ? fullname : ''}
                                            onChange={(e) => setFullname(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Col md={1}></Col>

                                    <Form.Group as={Col} controlId='phone'>
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Enter phone number'
                                            value={phone ? phone : ''}
                                            onChange={(e) => setPhone(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId='address'>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Enter address'
                                            value={address ? address : ''}
                                            onChange={(e) => setAddress(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId='city'>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Enter city'
                                            value={city ? city : ''}
                                            onChange={(e) => setCity(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId='country'>
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Enter country'
                                            value={country ? country : ''}
                                            onChange={(e) => setCountry(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <Form.Label>Select Method:</Form.Label>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Check
                                            type='radio'
                                            label='Cash On Delivery (COD)'
                                            id='cod'
                                            value='COD'
                                            name='paymentMethod'
                                            checked
                                            onChange={() => setPaymentMethod('COD')}
                                        >
                                        </Form.Check>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Check
                                            type='radio'
                                            label='Debit or Credit Card'
                                            id='credit'
                                            value='Debit or Credit Card'
                                            name='paymentMethod'
                                            onChange={() => setPaymentMethod('Debit or Credit Card')}
                                        >
                                        </Form.Check>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Check
                                            type='radio'
                                            label='PayPal'
                                            id='paypal'
                                            value='Paypal'
                                            name='paymentMethod'
                                            onChange={() => setPaymentMethod('Paypal')}
                                        >
                                        </Form.Check>
                                    </Form.Group>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cart.length === 0 ? <Message variant='info'>
                                    Your cart is empty
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.product.image} alt={item.product.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ${item.product.price} = ${(item.qty * item.product.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>

                        </ListGroup>
                    </Form>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Subtotal:</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${shippingCost}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalCost}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && <Message variant='danger'>{error}</Message>}

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.length === 0}
                                    onClick={orderHandler}
                                >
                                    Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default Checkout
