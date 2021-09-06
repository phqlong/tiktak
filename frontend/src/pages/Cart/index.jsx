import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Input } from "reactstrap"
import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import Message from 'components/Message'
import { setQtyInCart, removeFromCart } from 'app/cartSlice'

import "./Cart.scss"


function CartScreen({ match, location, history }) {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart)

    const setQtyInCartHandler = (id, newQty) => {
        dispatch(setQtyInCart({ "id": id, "qty": newQty }))
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=checkout')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product.id}>
                                <Row>
                                    <Col md={6}>
                                        <Row className="mb-3">
                                            <Col>
                                                <Link to={`/product/${item.product.id}`}>
                                                    <Image src={item.product.image} alt={item.product.name} fluid rounded />
                                                </Link>
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                                            </Col>

                                            <Col>
                                                ${item.product.price}
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col md={6}>
                                        <Row>
                                            <Col>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => setQtyInCartHandler(item.product.id, item.qty - 1)}
                                                >
                                                    <AiOutlineMinus style={{ fontSize: 25 }} />
                                                </Button>
                                            </Col>

                                            <Col>
                                                <Input
                                                    type="text"
                                                    value={item.qty}
                                                    onChange={(e) => setQtyInCartHandler(item.product.id, parseInt(e.target.value))}
                                                >
                                                </Input>
                                            </Col>

                                            <Col>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => setQtyInCartHandler(item.product.id, item.qty + 1)}
                                                >
                                                    <AiOutlinePlus style={{ fontSize: 25 }} />
                                                </Button>
                                            </Col>

                                            <Form.Group as={Col}>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(item.product.id)}
                                                >
                                                    <AiOutlineDelete style={{ fontSize: 25 }} />
                                                </Button>
                                            </Form.Group>
                                        </Row>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Total {cartItems.reduce((acc, item) => acc + item.qty, 0)} items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Checkout
                        </Button>
                    </ListGroup.Item>


                </Card>
            </Col>
        </Row >
    )
}

export default CartScreen